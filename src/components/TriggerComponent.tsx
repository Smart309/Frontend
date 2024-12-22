import React, { useState, useEffect } from "react";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";

interface ITrigger {
  _id: string;
  trigger_name: string;
  host_id: string;
  hostname?: string;
  severity: string;
  valuetrigger: number;
  ComparisonOperator: string;
  createdAt: string;
  enabled: boolean;
}

interface GroupedTriggers {
  [hostId: string]: {
    hostname: string;
    triggers: ITrigger[];
  };
}

const formatDate = (date: string | Date) => {
  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dateObj = typeof date === "string" ? new Date(date) : date;
  const year = dateObj.getFullYear();
  const month = englishMonths[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${day} ${month} ${year}`;
};

const TriggerComponent = () => {
  const [groupedTriggers, setGroupedTriggers] = useState<GroupedTriggers>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTriggerData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:3000/trigger");
      const triggersData = response.data.triggers;

      // Get unique host IDs
      const hostIds = [...new Set(triggersData.map((trigger: ITrigger) => trigger.host_id))];

      // Fetch host information for each unique host ID
      const hostsInfo = await Promise.all(
        hostIds.map(async (hostId) => {
          try {
            const hostResponse = await axios.get(`http://127.0.0.1:3000/host/${hostId}`);
            return hostResponse.data.data;
          } catch (error) {
            console.error(`Error fetching host info for ${hostId}:`, error);
            return null;
          }
        })
      );

      // Create a map of host IDs to hostnames
      const hostMap = hostsInfo.reduce((acc, host) => {
        if (host) {
          acc[host._id] = host.hostname;
        }
        return acc;
      }, {} as Record<string, string>);

      // Group triggers by host_id
      const grouped = triggersData.reduce((acc: GroupedTriggers, trigger: ITrigger) => {
        const hostname = hostMap[trigger.host_id] || 'Unknown Host';
        if (!acc[trigger.host_id]) {
          acc[trigger.host_id] = {
            hostname,
            triggers: []
          };
        }
        acc[trigger.host_id].triggers.push({
          ...trigger,
          hostname
        });
        return acc;
      }, {});

      setGroupedTriggers(grouped);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch trigger data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggerData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box>
      {Object.entries(groupedTriggers).map(([hostId, { hostname, triggers }]) => (
        <Box key={hostId} sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: '#242D5D',
              color: 'white',
              p: 2,
              borderRadius: '4px 4px 0 0',
            }}
          >
            {hostname}
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              "& .MuiPaper-root": { boxShadow: "none" },
              backgroundColor: "transparent",
              mb: 2,
            }}
          >
            <Table
              sx={{
                "& .MuiTable-root": { borderCollapse: "separate", borderSpacing: 0 },
                "& .MuiTableCell-root": { borderBottom: "none" },
                "& .MuiTableBody-root .MuiTableRow-root": {
                  "&:nth-of-type(even)": { backgroundColor: "white" },
                  "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                  "&:hover": {
                    backgroundColor: "#FFF3E0",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  },
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Trigger Name
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Severity
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Trigger Value
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Comparison Operator
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Created At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {triggers.map((trigger) => (
                  <TableRow key={trigger._id}>
                    <TableCell>{trigger.trigger_name}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: trigger.severity === 'critical' ? 'red' : 'orange',
                          fontWeight: 'bold'
                        }}
                      >
                        {trigger.severity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{trigger.valuetrigger}</TableCell>
                    <TableCell align="center">{trigger.ComparisonOperator}</TableCell>
                    <TableCell align="center">{formatDate(trigger.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
      {Object.keys(groupedTriggers).length === 0 && (
        <Typography align="center" sx={{ mt: 2 }}>
          No triggers found
        </Typography>
      )}
    </Box>
  );
};

export default TriggerComponent;
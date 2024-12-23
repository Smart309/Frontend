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
  IconButton,
} from "@mui/material";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITrigger } from "../interface/InterfaceCollection";


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

      const hostIds = [...new Set(triggersData.map((trigger: ITrigger) => trigger.host_id))];

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

      const hostMap = hostsInfo.reduce((acc, host) => {
        if (host) {
          acc[host._id] = host.hostname;
        }
        return acc;
      }, {} as Record<string, string>);

      const grouped = triggersData.reduce((acc: GroupedTriggers, trigger: ITrigger) => {
        const hostname = hostMap[trigger.host_id] || "Unknown Host";
        if (!acc[trigger.host_id]) {
          acc[trigger.host_id] = {
            hostname,
            triggers: [],
          };
        }
        acc[trigger.host_id].triggers.push({
          ...trigger,
          hostname,
        });
        return acc;
      }, {});

      setGroupedTriggers(grouped);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch trigger data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTriggerData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ width: 1 }}>
      {Object.entries(groupedTriggers).map(([hostId, { hostname, triggers }]) => (
        <Box key={hostId} sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#242D5D",
              color: "white",
              p: 2,
              borderRadius: "4px 4px 0 0",
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
                "& .MuiTable-root": {
                  borderCollapse: "separate",
                  borderSpacing: 0,
                },
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
                    Comparison Operator
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Trigger Value
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Created At
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "1.1rem", fontWeight: "medium" }}>
                    Action
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
                          color: trigger.severity === "critical" ? "red" : "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {trigger.severity}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{trigger.ComparisonOperator}</TableCell>
                    <TableCell align="center">{trigger.valuetrigger}</TableCell>
                    <TableCell align="center">{formatDate(trigger.createdAt)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        sx={{
                          mr: 1,
                          color: "warning.main",
                          "&:hover": { 
                            backgroundColor: "warning.light",
                          },
                        }}
                        onClick={() => console.log("Edit:", trigger._id)}
                      >
                        <EditNoteIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: "error.main",
                          "&:hover": { 
                            backgroundColor: "error.light",
                          },
                        }}
                        onClick={() => console.log("Delete:", trigger._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
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
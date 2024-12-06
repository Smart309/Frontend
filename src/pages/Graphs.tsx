import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import SNMPInPkts from "../components/graphComponent/SNMPInPkts";
import SNMPOutPkts from "../components/graphComponent/SNMPOutPkts";

interface Host {
  _id: string;
  hostname: string;
}

const Graphs = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [selectedHostId, setSelectedHostId] = useState<string>("");

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/host");
        setHosts(response.data.data);
        // Optionally set first host as default
        if (response.data.data.length > 0) {
          setSelectedHostId(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
    };

    fetchHosts();
  }, []);

  const handleHostChange = (event: SelectChangeEvent) => {
    setSelectedHostId(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
          mt: 2,
        }}
      >
        <FormControl sx={{ minWidth: 200 }} size="small">
          <Select
            value={selectedHostId}
            onChange={handleHostChange}
            displayEmpty
            sx={{
              backgroundColor: "white",
              "& .MuiSelect-select": {
                fontSize: 14,
              },
            }}
          >
            <MenuItem value="">
              <em>Select Device</em>
            </MenuItem>
            {hosts.map((host) => (
              <MenuItem key={host._id} value={host._id}>
                {host.hostname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedHostId && (
        <>
          <Box>
            <SNMPInPkts hostId={selectedHostId} />
          </Box>
          <Box sx={{ pb: 2 }}>
            <SNMPOutPkts hostId={selectedHostId} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Graphs;

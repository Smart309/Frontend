// AddDevice.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";

interface AddDeviceProps {
  onClose: () => void;
}

interface DeviceDetails {
  location: string;
  room: string;
}

const AddDevice: React.FC<AddDeviceProps> = ({ onClose }) => {
  const windowSize = useWindowSize();
  const [alignment, setAlignment] = useState<string>("IP");
  const [hostname, sethostname] = useState<string>("");
  const [ip_address, setip_address] = useState<string>("");
  const [snmp_port, setsnmp_port] = useState<string>("");
  const [snmp_version, setsnmp_version] = useState<string>("");
  const [snmp_community, setsnmp_community] = useState<string>("");
  const [hostgroup, sethostgroup] = useState<string>("");
  const [templates, settemplates] = useState<string>("");
  const [details_location, setdetails_location] = useState<string>("");
  const [details_room, setdetails_room] = useState<string>("");

  const details = {
    location: details_location,
    room: details_room,
  };

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleVersionChange = (event: SelectChangeEvent) => {
    setsnmp_version(event.target.value);
  };

  const StoreNewhost = async (
    hostname: string,
    ip_address: string,
    snmp_port: string,
    snmp_version: string,
    snmp_community: string,
    hostgroup: string,
    templates: string,
    details: DeviceDetails
  ): Promise<boolean> => {
    try {
      await axios.post("http://127.0.0.1:3000/host", {
        hostname,
        ip_address,
        snmp_port,
        snmp_version,
        snmp_community,
        hostgroup,
        templates,
        details,
      });
      return true;
    } catch (error) {
      console.error("Error recording New Host:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await StoreNewhost(
      hostname,
      ip_address,
      snmp_port,
      snmp_version,
      snmp_community,
      hostgroup,
      templates,
      details
    );
    if (success) {
      sethostname("");
      setip_address("");
      setsnmp_port("");
      setsnmp_version("");
      setsnmp_community("");
      sethostgroup("");
      settemplates("");
      setdetails_location("");
      setdetails_room("");
      alert("Device added successfully!");
      onClose();
    } else {
      alert("Failed to add device. Please try again.");
    }
  };

  const textFieldProps = {
    size: "small" as const,
    fullWidth: true,
    sx: {
      backgroundColor: "white",
      "& .MuiInputBase-input": {
        fontSize: 14,
      },
    },
  };

  const typographyProps = {
    fontSize: 14,
  };

  return (
    <Box sx={{ p: 0, width: "100%" }}>
      {windowSize.width > 600 && (
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", mb: 0, mt: 1 }}
        />
      )}

      <Paper elevation={0} sx={{ p: 2, backgroundColor: "#FFFFFB" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography
            sx={{
              mb: -2,
              fontSize: "1.1rem",
              color: "#a9a9a9",
              fontWeight: "semibold",
            }}
            {...typographyProps}
          >
            Host
          </Typography>
          <Box sx={{ borderTop: "2px solid #d9d9d9" }} />

          {/* Host Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Typography color="error" {...typographyProps}>
                *
              </Typography>
              <Typography sx={{ ml: 1 }} {...typographyProps}>
                Host name
              </Typography>
            </Box>
            <TextField
              {...textFieldProps}
              value={hostname}
              onChange={(e) => sethostname(e.target.value)}
            />
          </Box>

          {/* Templates */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: 120 }} {...typographyProps}>
              Templates
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
              <TextField
                {...textFieldProps}
                value={templates}
                onChange={(e) => settemplates(e.target.value)}
              />
              <Button variant="contained" size="small" sx={{ fontSize: 14 }}>
                Select
              </Button>
            </Box>
          </Box>

          {/* Host Groups */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Typography color="error" {...typographyProps}>
                *
              </Typography>
              <Typography sx={{ ml: 1 }} {...typographyProps}>
                Host groups
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
              <TextField
                {...textFieldProps}
                value={hostgroup}
                onChange={(e) => sethostgroup(e.target.value)}
              />
              <Button variant="contained" size="small" sx={{ fontSize: 14 }}>
                Select
              </Button>
            </Box>
          </Box>

          {/* Interfaces */}
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 4, mb: 1, px: 2 }}>
              <Typography sx={{ minWidth: 100 }} {...typographyProps}>
                Type
              </Typography>
              <Typography {...typographyProps}>IP address</Typography>
              <Typography {...typographyProps}>DNS name</Typography>
              <Typography {...typographyProps}>Connect to</Typography>
              <Typography {...typographyProps}>Port</Typography>
              <Typography {...typographyProps}>Default</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                "& .MuiInputBase-input": {
                  fontSize: 14,
                },
              }}
            >
              <Typography sx={{ minWidth: 100 }} {...typographyProps}>
                SNMP
              </Typography>
              <TextField
                {...textFieldProps}
                value={ip_address}
                onChange={(e) => setip_address(e.target.value)}
                sx={{ maxWidth: 200 }}
              />
              <TextField {...textFieldProps} sx={{ maxWidth: 200 }} />
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleAlignmentChange}
                size="small"
                sx={{
                  "& .MuiToggleButton-root": { fontSize: 14, color: "black" },
                }}
              >
                <ToggleButton value="IP">IP</ToggleButton>
                <ToggleButton value="DNS">DNS</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                {...textFieldProps}
                value={snmp_port}
                onChange={(e) => setsnmp_port(e.target.value)}
                sx={{ maxWidth: 100 }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RadioButtonCheckedIcon sx={{ fontSize: 14 }} />
                <Typography {...typographyProps}>remove</Typography>
              </Box>
            </Box>
          </Box>

          {/* SNMP Version */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Typography color="error" {...typographyProps}>
                *
              </Typography>
              <Typography sx={{ ml: 1 }} {...typographyProps}>
                SNMP version
              </Typography>
            </Box>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <Select
                value={snmp_version}
                onChange={handleVersionChange}
                displayEmpty
                sx={{
                  fontSize: 14,
                  "& .MuiMenuItem-root": { fontSize: 14 },
                }}
              >
                <MenuItem value="v1">SNMPv1</MenuItem>
                <MenuItem value="v2">SNMPv2</MenuItem>
                <MenuItem value="v3">SNMPv3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* SNMP Community */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 120 }}>
              <Typography color="error" {...typographyProps}>
                *
              </Typography>
              <Typography sx={{ ml: 1 }} {...typographyProps}>
                SNMP community
              </Typography>
            </Box>
            <TextField
              {...textFieldProps}
              value={snmp_community}
              onChange={(e) => setsnmp_community(e.target.value)}
            />
          </Box>

          {/* Details Section */}
          <Typography
            sx={{
              mb: -2,
              fontSize: "1.1rem",
              color: "#a9a9a9",
              fontWeight: "semibold",
            }}
            {...typographyProps}
          >
            Details
          </Typography>
          <Box sx={{ borderTop: "2px solid #d9d9d9" }} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ textAlign: "right", mt: 1 }}>
              <Typography sx={{ fontSize: 14 }}>Location</Typography>
              <Typography sx={{ fontSize: 14, mt: 4 }}>Room</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <TextField
                {...textFieldProps}
                value={details_location}
                onChange={(e) => setdetails_location(e.target.value)}
                sx={{
                  mb: 2,
                  width: "90%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
              <TextField
                {...textFieldProps}
                value={details_room}
                onChange={(e) => setdetails_room(e.target.value)}
                sx={{
                  mb: 0,
                  width: "90%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button
              type="submit"
              variant="outlined"
              sx={{
                fontSize: 14,
                color: "black",
                borderColor: "black",
                "&:hover": {
                  color: "red",
                  borderColor: "red",
                },
              }}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={onClose}
              sx={{ fontSize: 14 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddDevice;

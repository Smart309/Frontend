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
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ textAlign: "right", mt: 1, width: "20%" }}>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Typography sx={{ fontSize: 14, color: "red", mr: 1 }}>
                  *
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Host name</Typography>
              </Box>
              <Typography sx={{ fontSize: 14, mt: 4 }}>Templates</Typography>
              <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
                <Typography sx={{ fontSize: 14, color: "red", mr: 1 }}>
                  *
                </Typography>
                <Typography sx={{ fontSize: 14 }}>Host groups</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <TextField
                {...textFieldProps}
                value={hostname}
                onChange={(e) => sethostname(e.target.value)}
                sx={{
                  mb: 2,
                  width: 1,
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
              <TextField
                {...textFieldProps}
                value={templates}
                onChange={(e) => settemplates(e.target.value)}
                sx={{
                  mb: 2,
                  width: 1,
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
              <TextField
                {...textFieldProps}
                value={hostgroup}
                onChange={(e) => sethostgroup(e.target.value)}
                sx={{
                  mb: 0,
                  width: 1,
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Button
                variant="contained"
                size="small"
                sx={{ fontSize: 14, mb: 2, mt: 7 }}
              >
                Select
              </Button>
              <Button variant="contained" size="small" sx={{ fontSize: 14 }}>
                Select
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontSize: 14, mr: 6, ml: 2, textAlign: "left" }}>
              Interfaces
            </Typography>
            <Box sx={{ justifyContent: "left", mr: 2 }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>Type</Typography>
              <Typography sx={{ fontSize: 14, mt: 1 }}>SNMP</Typography>
            </Box>
            <Box sx={{ justifyContent: "left", mr: 0 }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>
                IP address
              </Typography>
              <TextField
                {...textFieldProps}
                value={ip_address}
                onChange={(e) => setip_address(e.target.value)}
                sx={{
                  width: "95%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
            <Box sx={{ justifyContent: "left", mr: 0 }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>
                DNS name
              </Typography>
              <TextField
                {...textFieldProps}
                sx={{
                  width: "95%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
            <Box sx={{ justifyContent: "left", width: "20%", mr: 0.3 }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>
                connect to
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleAlignmentChange}
                size="small"
                sx={{
                  width: "95%",
                  "& .MuiToggleButton-root": {
                    fontSize: 14,
                    color: "black",
                    width: "95%",
                  },
                }}
              >
                <ToggleButton value="IP">IP</ToggleButton>
                <ToggleButton value="DNS">DNS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ justifyContent: "left", width: "20%" }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>Port</Typography>
              <TextField
                {...textFieldProps}
                value={snmp_port}
                onChange={(e) => setsnmp_port(e.target.value)}
                sx={{
                  width: "95%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
            <Box sx={{ justifyContent: "left" }}>
              <Typography sx={{ fontSize: 14, color: "grey" }}>
                Default
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <RadioButtonCheckedIcon sx={{ fontSize: 14 }} />
                <Typography {...typographyProps}>remove</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ textAlign: "right", mt: 1, width: "18%" }}>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Typography sx={{ fontSize: 14, color: "red", mr: 1 }}>
                  *
                </Typography>
                <Typography sx={{ fontSize: 14 }}>SNMP version</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
                <Typography sx={{ fontSize: 14, color: "red", mr: 1 }}>
                  *
                </Typography>
                <Typography sx={{ fontSize: 14 }}>SNMP community</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <FormControl sx={{ minWidth: 200 }} size="small">
                <Select
                  value={snmp_version}
                  onChange={handleVersionChange}
                  displayEmpty
                  sx={{
                    mb: 2,
                    fontSize: 14,
                    "& .MuiMenuItem-root": { fontSize: 14 },
                  }}
                >
                  <MenuItem value="v1">SNMPv1</MenuItem>
                  <MenuItem value="v2">SNMPv2</MenuItem>
                  <MenuItem value="v3">SNMPv3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                {...textFieldProps}
                value={snmp_community}
                onChange={(e) => setsnmp_community(e.target.value)}
                sx={{
                  width: "90%",
                  "& .MuiInputBase-input": {
                    fontSize: 14,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Details Section */}
          <Typography
            sx={{
              mb: -2,
              fontSize: "1.1rem",
              color: "#a9a9a9",
              fontWeight: "semibold",
              mt: 2,
            }}
            {...typographyProps}
          >
            Details
          </Typography>
          <Box sx={{ borderTop: "2px solid #d9d9d9" }} />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ textAlign: "right", mt: 1, width: "18%" }}>
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Typography sx={{ fontSize: 14 }}>Location</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
                <Typography sx={{ fontSize: 14 }}>Room</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "left" }}>
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
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={onClose}
              sx={{ fontSize: 14 }}
            >
              Cancel
            </Button>
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
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddDevice;

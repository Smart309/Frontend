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

const AddTemplate: React.FC = () => {
  const windowSize = useWindowSize();
  const [alignment, setAlignment] = useState<string>("IP");

  // Remove unused snmpVersion state
  const [hostname, sethostname] = useState<string>(""); // Host name
  const [ip_address, setip_address] = useState<string>("");
  const [snmp_port, setsnmp_port] = useState<string>("");
  const [snmp_version, setsnmp_version] = useState<string>("");
  const [snmp_community, setsnmp_community] = useState<string>("");
  const [hostgroup, sethostgroup] = useState<string>("");
  const [templates, settemplates] = useState<string>("");

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // Update handleVersionChange to use setsnmp_version
  const handleVersionChange = (event: SelectChangeEvent) => {
    setsnmp_version(event.target.value);
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
      templates
    );
    if (success) {
      // Clear form fields after successful submission
      sethostname("");
      setip_address("");
      setsnmp_port("");
      setsnmp_version("");
      setsnmp_community("");
      sethostgroup("");
      settemplates("");
      alert("Device added successfully!");
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

  const StoreNewhost = async (
    hostname: string,
    ip_address: string,
    snmp_port: string,
    snmp_version: string,
    snmp_community: string,
    hostgroup: string,
    templates: string
  ): Promise<boolean> => {
    try {
      await axios.post("http://127.0.0.1:3000/host/createHost", {
        hostname,
        ip_address,
        snmp_port,
        snmp_version,
        snmp_community,
        hostgroup,
        templates,
      });
      return true;
    } catch (error) {
      console.error("Error recording New Host:", error);
      return false;
    }
  };

  return (
    <Box sx={{ p: 0, width: "100%" }}>
      {windowSize.width > 600 && (
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 0 }} />
      )}

      <Paper elevation={0} sx={{ p: 2, backgroundColor: "#FFFFFB" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                sethostname(e.target.value)
              }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  settemplates(e.target.value)
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  sethostgroup(e.target.value)
                }
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ minWidth: 100 }} {...typographyProps}>
                SNMP
              </Typography>
              <TextField
                {...textFieldProps}
                value={ip_address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setip_address(e.target.value)
                }
                sx={{ maxWidth: 200 }}
              />
              <TextField {...textFieldProps} sx={{ maxWidth: 200 }} />
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleAlignmentChange}
                size="small"
                sx={{ "& .MuiToggleButton-root": { fontSize: 14 } }}
              >
                <ToggleButton value="IP">IP</ToggleButton>
                <ToggleButton value="DNS">DNS</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                {...textFieldProps}
                value={snmp_port}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setsnmp_port(e.target.value)
                }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setsnmp_community(e.target.value)
              }
            />
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ fontSize: 14 }}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ fontSize: 14 }}
              onClick={() => {
                sethostname("");
                setip_address("");
                setsnmp_port("");
                setsnmp_version("");
                setsnmp_community("");
                sethostgroup("");
                settemplates("");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddTemplate;

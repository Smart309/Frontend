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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface ItemRow {
  id: number;
  name: string;
  oid: string;
  type: string;
  unit: string;
  updateInterval: string;
  history: string;
  trend: string;
}

interface AddTemplateProps {
  onClose: () => void;
}

const AddTemplate: React.FC<AddTemplateProps> = ({ onClose }) => {
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

  const [itemRows, setItemRows] = useState<ItemRow[]>([
    {
      id: 1,
      name: "",
      oid: "",
      type: "",
      unit: "",
      updateInterval: "",
      history: "",
      trend: "",
    },
  ]);

  const handleAddRow = () => {
    const newRow: ItemRow = {
      id: itemRows.length + 1,
      name: "",
      oid: "",
      type: "",
      unit: "",
      updateInterval: "",
      history: "",
      trend: "",
    };
    setItemRows([...itemRows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    if (itemRows.length > 1) {
      setItemRows(itemRows.filter((row) => row.id !== id));
    }
  };

  const handleItemChange = (
    id: number,
    field: keyof ItemRow,
    value: string
  ) => {
    setItemRows(
      itemRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
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
          {/* Template section */}
          <Typography
            sx={{
              mt: 0,
              mb: -2,
              fontSize: "1.1rem",
              color: "#a9a9a9",
              fontWeight: "semibold",
            }}
            {...typographyProps}
          >
            TEMPLATE
          </Typography>
          <Box sx={{ borderTop: "2px solid #d9d9d9" }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", minWidth: 150 }}>
              <Typography color="error" {...typographyProps}>
                *
              </Typography>
              <Typography sx={{ ml: 1 }} {...typographyProps}>
                Template name
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
          <Box sx={{}}>
            <Typography
              sx={{
                fontSize: "1.1rem",
                color: "#a9a9a9",
                fontWeight: "semibold",
              }}
            >
              ITEMS
            </Typography>
            <Box sx={{ borderTop: "2px solid #d9d9d9" }} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <AddIcon
              onClick={handleAddRow}
              sx={{
                color: "black",
                cursor: "pointer",
                border: "2px solid",
                // borderRadius: "50%", // Optional for rounded borders
                padding: 0.5,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Box>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ width: 1 }}>
                <TableCell>Item's name</TableCell>
                <TableCell>OID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Update Interval</TableCell>
                <TableCell>History</TableCell>
                <TableCell>Trend</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.name}
                      onChange={(e) =>
                        handleItemChange(row.id, "name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.oid}
                      onChange={(e) =>
                        handleItemChange(row.id, "oid", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.type}
                      onChange={(e) =>
                        handleItemChange(row.id, "type", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.unit}
                      onChange={(e) =>
                        handleItemChange(row.id, "unit", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.updateInterval}
                      onChange={(e) =>
                        handleItemChange(
                          row.id,
                          "updateInterval",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.history}
                      onChange={(e) =>
                        handleItemChange(row.id, "history", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      {...textFieldProps}
                      value={row.trend}
                      onChange={(e) =>
                        handleItemChange(row.id, "trend", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteRow(row.id)}
                      disabled={itemRows.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
          }}
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
      </Paper>
    </Box>
  );
};

export default AddTemplate;

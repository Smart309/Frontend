import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { Pencil, Trash2 } from "lucide-react";
import useWindowSize from "../hooks/useWindowSize";
import AddDevice from "../components/Modules/AddDevice";

interface DeviceDetails {
  location: string;
  Room: string;
  serialNo: string;
  os: string;
  type: string;
  vendor: string;
  hardware: string;
}

interface Item {
  name_item: string;
  oid: string;
  type: string;
  unit: string;
}

interface Device {
  _id: string;
  hostname: string;
  ip_address: string;
  snmp_port: string;
  snmp_version: string;
  snmp_community: string;
  hostgroup: string;
  details: DeviceDetails;
  items: Item[];
  status: number;
}

const Management: React.FC = () => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3000/host");
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const result = await response.json();
        setDevices(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleEdit = (deviceId: string) => {
    console.log("Edit device:", deviceId);
    // Add your edit logic here
  };

  const handleDelete = (deviceId: string) => {
    console.log("Delete device:", deviceId);
    // Add your delete logic here
  };

  // Column headers for the grid
  const columns = [
    { field: 'hostname', label: 'Hostname' },
    { field: 'ip_address', label: 'IP Address' },
    { field: 'details.location', label: 'Location' },
    { field: '_id', label: 'ID' },
    { field: 'actions', label: 'Actions' }
  ];

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            height: "auto",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            DEVICE MANAGEMENT
          </Typography>
        </Box>
      )}

      <Paper sx={{ mt: 2, p: 2 }}>
        {/* Header Row */}
        <Grid container spacing={2} sx={{ mb: 2, fontWeight: 'bold' }}>
          {columns.map((column) => (
            <Grid 
              item 
              xs={column.field === 'actions' ? 2 : 2.5} 
              key={column.field}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {column.label}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Data Rows */}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          devices.map((device) => (
            <Grid
              container
              spacing={2}
              key={device._id}
              sx={{
                py: 2,
                borderBottom: '1px solid #eee',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              <Grid item xs={2.5}>
                <Typography>{device.hostname}</Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography>{device.ip_address}</Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography>{device.details.location}</Typography>
              </Grid>
              <Grid item xs={2.5}>
                <Typography>{device._id}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  onClick={() => handleEdit(device._id)}
                  size="small"
                  sx={{ 
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.light' }
                  }}
                >
                  <Pencil size={18} />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(device._id)}
                  size="small"
                  sx={{ 
                    color: 'error.main',
                    '&:hover': { backgroundColor: 'error.light' }
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}
      </Paper>
    </>
  );
};

export default Management;
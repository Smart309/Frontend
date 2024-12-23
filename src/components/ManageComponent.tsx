import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Container,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDevice } from "../interface/InterfaceCollection";

interface ApiResponse {
  status: string;
  message: string;
  data: IDevice[];
}

const ManageComponent = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3000/host");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        if (result.status !== "success") {
          throw new Error(result.message || "Failed to fetch devices");
        }

        setDevices(result.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch devices";
        setError(errorMessage);
        console.error("Error fetching devices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return 'success';
      case 0:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return 'Active';
      case 0:
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (devices.length === 0) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="textSecondary" variant="h6">
            No devices found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          mt: 2
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
              padding: '16px'
            },
            '& .MuiTableRow-root:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  Hostname
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  IP Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  SNMP Version
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  Group
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="medium">
                  Status
                </Typography>
              </TableCell>
              <TableCell width={120} align="center">
                <Typography variant="subtitle1" fontWeight="medium">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device._id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {device.hostname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {device.ip_address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {device.snmp_version.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {device.hostgroup}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {device.details?.location || device.details?.location || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(device.status)}
                    color={getStatusColor(device.status)}
                    size="small"
                    sx={{ minWidth: '80px' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    size="small"
                    sx={{ 
                      mr: 1,
                      '&:hover': {
                        backgroundColor: 'warning.light'
                      }
                    }}
                    onClick={() => console.log('Edit:', device._id)}
                  >
                    <EditNoteIcon sx={{ color: 'warning.main' }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'error.light'
                      }
                    }}
                    onClick={() => console.log('Delete:', device._id)}
                  >
                    <DeleteIcon sx={{ color: 'error.main' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageComponent;
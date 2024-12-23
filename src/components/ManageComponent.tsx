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
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDeviceData } from "../api/DeviceDetailApi";
import { IDevice } from "../interface/InterfaceCollection";

const ManageComponent = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const fetchedDevices = await getDeviceData();
        setDevices(fetchedDevices);
      } catch (err) {
        setError("Failed to fetch devices");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        "& .MuiPaper-root": { boxShadow: "none" },
        backgroundColor: "transparent",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
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
        aria-label="devices table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "1.2rem", fontWeight: "medium" }}>
              Vendor
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "1.2rem", fontWeight: "medium" }}
            >
              Name
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "1.2rem", fontWeight: "medium" }}
            >
              Location
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "1.2rem", fontWeight: "medium" }}
            >
              MAC address
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "1.2rem", fontWeight: "medium" }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.DMACaddress} sx={{ cursor: "pointer" }}>
              <TableCell component="th" scope="row">
                {device.vendor}
              </TableCell>
              <TableCell align="center">{device.Dname}</TableCell>
              <TableCell align="center">{device.location}</TableCell>
              <TableCell align="center">{device.DMACaddress}</TableCell>
              <TableCell align="center">
                <IconButton
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  aria-label="edit"
                >
                  <EditNoteIcon
                    sx={{
                      color: "#EFA91D",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon
                    sx={{
                      color: "red",
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageComponent;

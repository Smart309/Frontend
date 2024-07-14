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
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAlertData } from "../api/AlertApi"; // Adjust this import based on your file structure
import { IAlert } from "../interface/IDevice"; // Adjust this import based on your file structure

const AlertsComponent = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const fetchedAlerts = await getAlertData();
        setAlerts(fetchedAlerts);
      } catch (err) {
        setError("Failed to fetch alerts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleSearchClick = () => {
    setSearching(true);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSearching(false);
      setSnackbarOpen(false);
    }, 2000); // Assuming search operation takes 2 seconds
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
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
        aria-label="alerts table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="center">Problem</TableCell>
            <TableCell align="center">Area</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert, index) => (
            <TableRow key={index}>
              <TableCell>{alert.startTime}</TableCell>
              <TableCell align="center">{alert.problem}</TableCell>
              <TableCell align="center">{alert.area}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="find"
                  onClick={handleSearchClick}
                  sx={{
                    color: "white",
                    backgroundColor: "blue",
                    borderRadius: "100%",
                    "&:focus": {
                      outline: "none",
                    },
                    "&:hover": {
                      backgroundColor: "darkblue",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Searching..."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </TableContainer>
  );
};

export default AlertsComponent;

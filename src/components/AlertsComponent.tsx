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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

// Function to create sample data rows
function createData(Time: Date, Problem: string, Area: string) {
  return { Time, Problem, Area };
}

const rows = [
  createData(
    new Date(2021, 10, 25, 12, 0, 0),
    "Traffic overload",
    "Device One"
  ),
  createData(
    new Date(2021, 10, 25, 12, 0, 0),
    "Traffic overload",
    "Device One"
  ),
];

const AlertsComponent = () => {
  const [searching, setSearching] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="center">Problem</TableCell>
            <TableCell align="center">Area</TableCell>
            <TableCell align="center">Actions</TableCell>
            {/* Added Actions column header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index} // Use index as key for simplicity (replace with unique ID if available)
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.Time.toLocaleString()}</TableCell>
              <TableCell align="center">{row.Problem}</TableCell>
              <TableCell align="center">{row.Area}</TableCell>
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

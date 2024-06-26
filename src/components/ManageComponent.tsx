import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

// Function to create sample data rows
function createData(
  Vendor: string,
  Name: string,
  Location: string,
  MACaddress: string
) {
  return { Vendor, Name, Location, MACaddress };
}

const rows = [
  createData("Cisco", "Device One", "30's Building", "192.168.1.65"),
  createData("Huawei", "Device Two", "Mechanical Building 4", "192.168.1.66"),
  createData("Lenovo", "Device Three", "Mechanical Building 4", "192.168.1.67"),
  createData("Dell", "Device Four", "30's Building", "192.168.1.68"),
];

const ManageComponent = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vendor</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">MAC address</TableCell>
            <TableCell align="center"></TableCell>{" "}
            {/* Added Actions column header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index} // Use index as key for simplicity (replace with unique ID if available)
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Vendor}
              </TableCell>
              <TableCell align="center">{row.Name}</TableCell>
              <TableCell align="center">{row.Location}</TableCell>
              <TableCell align="center">{row.MACaddress}</TableCell>
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography } from "@mui/material";

function Data(
  Interface: string,
  IPAddress: string,
  Speed: string,
  Status: string
) {
  return { Interface, IPAddress, Speed, Status };
}

const rows = [
  Data("Vlan0", "10.10.127.0", "10 Mbps", "Up"),
  Data("Ethernet 0/1", "10.10.127.1", "1 Gbps", "Up"),
  Data("Ethernet 0/2", "10.10.127.3", "10 Mbps", "Down"),
  Data("Vlan1", "10.10.127.5", "10 Mbps", "Up"),
];

const DeviceInterfaceComponent = () => {
  return (
    <Grid container sx={{ width: "95%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="Interface table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="h6"
                component="div"
                color={"#242D5D"}
                sx={{ fontSize: "1.5rem" }}
              >
                Interface
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h6"
                component="div"
                color={"#242D5D"}
                sx={{ fontSize: "1.5rem", textAlign: "center" }}
              >
                IP
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h6"
                component="div"
                color={"#242D5D"}
                sx={{ fontSize: "1.5rem", textAlign: "center" }}
              >
                Speed
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h6"
                component="div"
                color={"#242D5D"}
                sx={{ fontSize: "1.5rem", textAlign: "center" }}
              >
                Status
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Interface}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography sx={{ fontSize: "18px" }}>
                  {row.Interface}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "18px" }}>
                  {row.IPAddress}
                </Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "18px" }}>{row.Speed}</Typography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "18px" }}>{row.Status}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default DeviceInterfaceComponent;

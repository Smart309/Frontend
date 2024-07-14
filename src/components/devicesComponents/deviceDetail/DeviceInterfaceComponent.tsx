import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { getDeviceINT } from "../../../api/DeviceInterfaceApi";
import { IInterface } from "../../../interface/IDevice";

interface DeviceInterfaceComponentProps {
  DMACaddress: string;
}

const DeviceInterfaceComponent = ({
  DMACaddress,
}: DeviceInterfaceComponentProps) => {
  const [deviceINT, setDeviceINT] = useState<IInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const data = await getDeviceINT();
        setDeviceINT(
          data.filter(
            (interfaceData) => interfaceData.DMACaddress === DMACaddress
          )
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [DMACaddress]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <>
      <Grid container sx={{ width: "95%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Interface table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  variant="h6"
                  component="div"
                  color={"#242D5D"}
                  sx={{ fontSize: "1.3rem" }}
                >
                  Interface
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  component="div"
                  color={"#242D5D"}
                  sx={{ fontSize: "1.3rem", textAlign: "center" }}
                >
                  IP
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  component="div"
                  color={"#242D5D"}
                  sx={{ fontSize: "1.3rem", textAlign: "center" }}
                >
                  Speed
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  component="div"
                  color={"#242D5D"}
                  sx={{ fontSize: "1.3rem", textAlign: "center" }}
                >
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceINT?.map((interfaceData) => (
              <TableRow
                key={interfaceData.ImacAddress}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontSize: "18px" }}>
                    {interfaceData.Intname}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "18px" }}>
                    {interfaceData.ipAddress}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{ fontSize: "18px" }}
                  >{`${interfaceData.speed} Mbps`}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "18px" }}>
                    {interfaceData.status ? "Up" : "Down"}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
};

export default DeviceInterfaceComponent;

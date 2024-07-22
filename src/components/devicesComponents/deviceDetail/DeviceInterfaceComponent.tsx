// DeviceInterfaceComponent.tsx
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getDeviceINT } from "../../../api/DeviceInterfaceApi";
import { IInterface } from "../../../interface/IDevice";

interface DeviceInterfaceComponentProps {
  DMACaddress: string;
}

const DeviceInterfaceComponent: React.FC<DeviceInterfaceComponentProps> = ({
  DMACaddress,
}) => {
  const [deviceINT, setDeviceINT] = useState<IInterface[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceINT = async () => {
      setLoading(true);
      try {
        const allInterfaces = await getDeviceINT();
        const interfaces = allInterfaces.filter(
          (interfaceData) => interfaceData.DMACaddress === DMACaddress
        );
        console.log("Fetched interfaces:", interfaces); // Log the interfaces data
        setDeviceINT(interfaces);
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

    fetchDeviceINT();
  }, [DMACaddress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error); // Log the error
    return <div>Error: {error}</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        color={"#242D5D"}
        sx={{ fontSize: "1.2rem", textAlign: "left" }}
      >
        Interface Information
      </Typography>

      <Divider
        sx={{
          width: "96%",
          backgroundColor: "gray",
          marginTop: 2,
          marginBottom: 2,
        }}
      />

      <Table sx={{ minWidth: 650, marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Interface Name</TableCell>
            <TableCell>IP Address</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deviceINT?.map((interfaceData) => (
            <TableRow key={interfaceData.ipAddress || interfaceData.Intname}>
              <TableCell>{interfaceData.Intname || "Unknown Name"}</TableCell>
              <TableCell>{interfaceData.ipAddress || "Unknown IP"}</TableCell>
              <TableCell>{interfaceData.speed || "Unknown Speed"}</TableCell>
              <TableCell>
                {interfaceData.status ? "Active" : "Inactive"}
              </TableCell>
            </TableRow>
          )) || (
            <TableRow>
              <TableCell colSpan={4}>No interfaces available.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DeviceInterfaceComponent;

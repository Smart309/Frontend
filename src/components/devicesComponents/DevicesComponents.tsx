import React, { useEffect, useState } from "react";
import { Card, Typography, Grid } from "@mui/material";
import DevicesCard from "./DevicesCard";
import { getDeviceData } from "../../api/DeviceDetailApi";

interface DevicesComponentsProps {
  location: string;
}

const DevicesComponents: React.FC<DevicesComponentsProps> = ({ location }) => {
  const [devices, setDevices] = useState<IDevice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDeviceData();
        const filteredDevices = data.filter(
          (device) => device.Location === location
        );
        setDevices(filteredDevices);
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <Card
      sx={{
        height: "auto",
        width: "68rem",
        bgcolor: "#FFFFFB",
        borderRadius: "30px",
        position: "relative",
        boxShadow: "none",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        marginBottom: 3,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        color={"#21248B"}
        sx={{ alignSelf: "flex-start", paddingTop: 2 }}
      >
        {location || "Default Location"}
      </Typography>
      <Grid container spacing={3} marginTop={0} marginBottom={2}>
        {devices.map((device, index) => (
          <Grid item key={index}>
            <DevicesCard
              device={device} // Pass device object here
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default DevicesComponents;

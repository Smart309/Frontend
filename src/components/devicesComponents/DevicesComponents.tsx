import React, { useEffect, useState } from "react";
import { Card, Typography, Grid, Box } from "@mui/material";
import DevicesCard from "./DevicesCard";
import { getDeviceData } from "../../api/DeviceDetailApi";
import { IDevice } from "../../interface/IDevice";

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
          (device) => device.location === location
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
        borderRadius: 3,
        position: "relative",
        boxShadow: "none",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1,
        display: "flex",
        flexDirection: "column",

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
      <Box
        sx={{
          px:1,
          overflowX: "auto", // Enable horizontal scrolling
          width: "100%", // Ensure it takes the full width of its parent
        }}
      >
        <Grid
          container
          spacing={3}
          marginTop={0}
          marginBottom={2}
          sx={{
            width: "max-content", // Ensure the Grid content dictates the width
          }}
        >
          {devices.map((device, index) => (
            <Grid item key={index}>
              <DevicesCard device={device} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

export default DevicesComponents;

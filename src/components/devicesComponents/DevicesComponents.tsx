import React from "react";
import { Card, Typography, Grid, Box } from "@mui/material";
import DevicesCard from "./DevicesCard";
import { IDevice } from "../../interface/IDevice";

interface DevicesComponentsProps {
  devices: IDevice[];
}

const DevicesComponents: React.FC<DevicesComponentsProps> = ({ devices }) => {
  const groupedDevices = devices.reduce((acc, device) => {
    const location = device.details?.location || "Unknown Location";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(device);
    return acc;
  }, {} as Record<string, IDevice[]>);

  return (
    <>
      {Object.entries(groupedDevices).map(([location, devices]) => (
        <Box key={location} sx={{ marginBottom: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ marginBottom: 1, textAlign: "left", color: "blue" }}
          >
            {location}
          </Typography>
          <Grid container spacing={2}>
            {devices.map((device) => (
              <Grid item xs={12} sm={6} md={4} key={device._id}>
                <DevicesCard device={device} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default DevicesComponents;
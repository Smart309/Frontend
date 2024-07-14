import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Grid } from "@mui/material";
import DevicesCard from "./DevicesCard";
import { IDetails } from "../../interface/IDetails";
import { getDetailsData } from "../../api/DetailsApi";

const DevicesComponents = ({ location }: { location: string }) => {
  const [devices, setDevices] = useState<IDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailsData();
        // Filter devices based on the location
        setDevices(data.filter((device) => device.Location === location));
      } catch (error) {
        console.error("Error fetching details data:", error);
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
      <Grid container spacing={3} marginTop={0.1} marginBottom={3}>
        {devices.map((device, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <DevicesCard />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default DevicesComponents;

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import axios from "axios"; // You'll need to install axios: npm install axios

interface DeviceData {
  DMACaddress: string;
  DName: string | null;
  Location: string | null;
  Hardware: string | null;
  Os: string | null;
  Type: string | null;
  Vendor: string | null;
  Room: string | null;
  Status: boolean;
}

const DeviceDetailComponent = () => {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await axios.get<DeviceData[]>("http://localhost:3000/getDevice");
        if (response.data.length > 0) {
          setDeviceData(response.data[0]); // Get the first device for now
        } else {
          setError("No devices found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching device data:", error);
        setError("Failed to fetch device data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!deviceData) {
    return <div>No device data available.</div>;
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: 5.5,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color={"#242D5D"}
          sx={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          {deviceData.DName || "Unknown Device"}
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "96%",
          backgroundColor: "gray",
          marginTop: 2,
          marginBottom: 2,
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginLeft: 7,
        }}
      >
        <Grid container sx={{ width: "90%" }}>
          <Grid item xs={12} sx={{ marginBottom: 2, marginTop: 1.5 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  fontWeight="medium"
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Hardware
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                 {deviceData.Hardware || "Unknown Hardware"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Operating System
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
            {deviceData.Os || "Unknown Os"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  fontWeight="medium"
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Type
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  {deviceData.Type || "Unknown Type"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Vendor
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  {deviceData.Vendor || "Unknown Vendor"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Location
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  {deviceData.Location || "Unknown Location"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  fontWeight="medium"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Room
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  {deviceData.Room || "Unknown Room"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Status
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  {deviceData.Status || "Unknown Status"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DeviceDetailComponent;

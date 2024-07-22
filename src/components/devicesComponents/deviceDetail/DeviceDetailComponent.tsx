// DeviceDetailComponent.tsx
import { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getDeviceData } from "../../../api/DeviceDetailApi";
import { IDevice } from "../../../interface/IDevice";
import useWindowSize from "../../../hooks/useWindowSize";
import DeviceInterfaceComponent from "./DeviceInterfaceComponent";

const DeviceDetailComponent = () => {
  const location = useLocation();
  const [deviceData, setDeviceData] = useState<IDevice | null>(
    location.state?.device || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (!deviceData) {
      setLoading(true);
      const fetchDeviceData = async () => {
        try {
          const allDevices = await getDeviceData();
          console.log("All devices fetched:", allDevices);

          const device =
            allDevices.find((d) => d.Dname === location.state?.device?.DName) ||
            null;
          console.log("Fetched device:", device);
          setDeviceData(device);
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
    }
  }, [deviceData, location.state?.device?.DName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
          {deviceData.Dname || "Unknown Device"}
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
          {/* Hardware */}
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
                  {deviceData.hardware || "Unknown Hardware"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Operating System */}
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
                  {deviceData.os || "Unknown OS"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Type */}
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
                  {deviceData.type || "Unknown Type"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Vendor */}
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
                  {deviceData.vendor || "Unknown Vendor"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Location */}
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
                  {deviceData.location || "Unknown Location"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Room */}
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
                  {deviceData.room || "Unknown Room"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Status */}
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
                  {deviceData.status ? "Active" : "Inactive"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: "#FFFFFB",
          flex: 1,
          display: "flex",
          borderRadius: 8,
          flexDirection: "column",
          justifyContent: windowSize.width >= 1100 ? "center" : "start",
          alignItems: "center",
          minHeight: "fit-content",
          marginBottom: 5,
          py: 3,
          pb: 3,
        }}
      >
        {windowSize.width < 1100 && (
          <Typography
            align="center"
            sx={{
              mt: "6rem",
              mb: "2rem",
            }}
          ></Typography>
        )}
      </Box>
      <DeviceInterfaceComponent DMACaddress={deviceData.DMACaddress} />
    </>
  );
};

export default DeviceDetailComponent;

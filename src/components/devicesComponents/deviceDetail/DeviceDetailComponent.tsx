import { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getDeviceData } from "../../../api/DeviceDetailApi";

const DeviceDetailComponent = () => {
  const location = useLocation();
  const [deviceData, setDeviceData] = useState<IDevice | null>(
    location.state?.device || null
  );
  const [loading, setLoading] = useState(false); // no need to load again
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deviceData) {
      setLoading(true);
      // Fetch device data only if deviceData is not passed
      const fetchDeviceData = async () => {
        try {
          const allDevices = await getDeviceData();
          setDeviceData(
            allDevices.find((d) => d.DName === location.state?.device?.DName) ||
              null
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
    }
  }, [deviceData, location.state?.device?.DName]);

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
          {/* Repeat similar structure for other properties */}
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
          {/* Add other properties in a similar way */}
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
                  {deviceData.Status ? "Active" : "Inactive"}
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

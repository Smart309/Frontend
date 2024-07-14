import { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { getDeviceData } from "../../../api/DeviceDetailApi";
import DeviceInterfaceComponent from "./DeviceInterfaceComponent"; // Adjust the import path as necessary
import { IDevice } from "../../../interface/IDevice";

const DeviceDetailComponent = () => {
  const [deviceData, setDeviceData] = useState<IDevice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const device = await getDeviceData();
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
          {[
            { label: "MACaddress", value: deviceData.DMACaddress },
            { label: "Hardware", value: deviceData.hardware },
            { label: "Operating System", value: deviceData.os },
            { label: "Type", value: deviceData.type },
            { label: "Vendor", value: deviceData.vendor },
            { label: "Location", value: deviceData.location },
            { label: "Room", value: deviceData.room },
            {
              label: "Status",
              value: deviceData.status ? "Active" : "Inactive",
            },
          ].map((item, index) => (
            <Grid
              item
              xs={12}
              sx={{ marginBottom: 2, marginTop: index === 0 ? 1.5 : 0 }}
              key={item.label}
            >
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
                    {item.label}
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
                    {item.value || `Unknown ${item.label}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

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
          variant="h5"
          component="div"
          fontWeight={600}
          color={"#242D5D"}
          sx={{ mt: 5 }}
        >
          INTERFACE
        </Typography>
      </Box>
      <Divider
        sx={{
          width: "96%",
          backgroundColor: "gray",
          mt: 2,
          marginBottom: 2,
        }}
      />

      <DeviceInterfaceComponent DMACaddress={deviceData.DMACaddress} />
    </>
  );
};

export default DeviceDetailComponent;

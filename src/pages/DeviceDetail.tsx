import { Button, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

interface DeviceDetails {
  location: string;
  Room: string;
  serialNo: string;
  os: string;
  type: string;
  vendor: string;
  hardware: string;
}

interface Item {
  name_item: string;
  oid: string;
  type: string;
  unit: string;
}

interface Device {
  _id: string;
  hostname: string;
  ip_address: string;
  snmp_port: string;
  snmp_version: string;
  snmp_community: string;
  hostgroup: string;
  details: DeviceDetails;
  items: Item[];
  status: number;
}

const DeviceDetail = () => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const { serialNo } = useParams();
  const [deviceData, setDeviceData] = useState<Device | null>(
    location.state?.device || null
  );

  useEffect(() => {
    const fetchDeviceData = async () => {
      if (!deviceData && serialNo) {
        try {
          const response = await fetch(`http://localhost:3000/host`);
          if (!response.ok) {
            throw new Error("Failed to fetch device data");
          }
          const result = await response.json();
          const device = result.data.find(
            (d: Device) => d.details.serialNo === serialNo
          );
          setDeviceData(device || null);
        } catch (error) {
          console.error("Error fetching device data:", error);
        }
      }
    };

    fetchDeviceData();
  }, [deviceData, serialNo]);

  if (!deviceData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 5,
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            DEVICE DETAILS
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          width: 1,
          marginTop: 2,
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFB",
            flex: 1,
            display: "flex",
            borderRadius: 8,
            flexDirection: "column",
            padding: 4,
            marginBottom: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Basic Information
              </Typography>
              <Typography>Hostname: {deviceData.hostname}</Typography>
              <Typography>IP Address: {deviceData.ip_address}</Typography>
              <Typography>Host Group: {deviceData.hostgroup}</Typography>
              <Typography>SNMP Version: {deviceData.snmp_version}</Typography>
              <Typography>SNMP Port: {deviceData.snmp_port}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Device Details
              </Typography>
              <Typography>Location: {deviceData.details.location}</Typography>
              <Typography>Room: {deviceData.details.Room}</Typography>
              <Typography>
                Serial Number: {deviceData.details.serialNo}
              </Typography>
              <Typography>OS: {deviceData.details.os}</Typography>
              <Typography>Type: {deviceData.details.type}</Typography>
              <Typography>Vendor: {deviceData.details.vendor}</Typography>
              <Typography>Hardware: {deviceData.details.hardware}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            INTERFACE
          </Typography>
          <Button
            sx={{
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "5.5rem",
              height: "2.5rem",
              "&:hover": {
                backgroundColor: "#F37E58",
              },
            }}
          >
            Graph
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFFFB",
            flex: 1,
            display: "flex",
            borderRadius: 8,
            flexDirection: "column",
            padding: 4,
          }}
        >
          <Grid container spacing={2}>
            {deviceData.items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    padding: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {item.name_item}
                  </Typography>
                  <Typography>OID: {item.oid}</Typography>
                  <Typography>Type: {item.type}</Typography>
                  <Typography>Unit: {item.unit}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default DeviceDetail;

//end process in this page

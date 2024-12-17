import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { IDevice } from "../interface/IDevice";
import { getDeviceData } from "../api/DeviceDetailApi";
import DeviceDetailComponent from "../components/devicesComponents/deviceDetail/DeviceDetailComponent";  // Updated import
import DeviceInterfaceComponent from "../components/devicesComponents/deviceDetail/DeviceInterfaceComponent";

const DeviceDetailPage = () => {
  const location = useLocation();
  const [deviceData, setDeviceData] = useState<IDevice | null>(
    location.state?.device || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!deviceData) {
      setLoading(true);
      const fetchDeviceData = async () => {
        try {
          const allDevices = await getDeviceData();
          setDeviceData(
            allDevices.find((d) => d.hostname === location.state?.device?.DName) ||
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
    <Box sx={{ marginTop: 2, padding: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={600} color={"#242D5D"}>
        Device Details
      </Typography>

      {/* Device Info Component */}
      <DeviceDetailComponent deviceData={deviceData} />

      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

      {/* Device Items Component */}
      <DeviceInterfaceComponent items={deviceData.items} />
    </Box>
  );
};

export default DeviceDetailPage;

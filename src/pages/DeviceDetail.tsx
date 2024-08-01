import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import DeviceDetailComponent from "../components/devicesComponents/deviceDetail/DeviceDetailComponent";
import DeviceInterfaceComponent from "../components/devicesComponents/deviceDetail/DeviceInterfaceComponent";
import { getDeviceData } from "../api/DeviceDetailApi";
import { IDevice } from "../interface/IDevice";

const DeviceDetail = () => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const [deviceData, setDeviceData] = useState<IDevice | null>(
    location.state?.device || null
  );

  useEffect(() => {
    if (!deviceData) {
      const fetchDeviceData = async () => {
        try {
          const allDevices = await getDeviceData();
          setDeviceData(
            allDevices.find((d) => d.Dname === location.state?.device?.DName) ||
              null
          );
        } catch (error) {
          console.error("Error fetching device data:", error);
        }
      };

      fetchDeviceData();
    }
  }, [deviceData, location.state?.device?.DName]);

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
            DEVICE'S DETAIL
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
            alignItems: "center",
            minHeight: "fit-content",
            marginBottom: 5,
            height: 1,
            py: 3,
          }}
        >
          <DeviceDetailComponent />
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
            type="submit"
            sx={{
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "5.5rem",
              height: "2.5rem",
              "&:focus": {
                outline: "none",
                color: "#FFFFFB",
              },
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
            justifyContent: windowSize.width >= 1100 ? "center" : "start",
            alignItems: "center",
            minHeight: "fit-content",
            marginBottom: 5,
            py: 3,
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
          {deviceData && (
            <DeviceInterfaceComponent DMACaddress={deviceData.DMACaddress} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default DeviceDetail;
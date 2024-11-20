import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize";
import DevicesComponents from "../components/devicesComponents/DevicesComponents";
import { getDeviceData } from "../api/DeviceDetailApi";
import { IDevice } from "../interface/IDevice";

const Devices: React.FC = () => {
  const windowSize = useWindowSize();
  const [deviceList, setDeviceList] = useState<IDevice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDeviceData();
        setDeviceList(data); // Set data directly as an array
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations and filter out null values
  const uniqueLocations = Array.from(
    new Set(
      deviceList
        .map((device) => device.location)
        .filter((loc): loc is string => loc !== null)
    )
  );

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            DEVICES
          </Typography>
          <Button
            type="submit"
            sx={{
              // px: 4,
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "8rem",
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
            Add Device
          </Button>
        </Box>
      )}
      <Box
        sx={{
          width: 1,
          marginTop: 2,
          height: "auto",
          display: "flex",
        }}
      >
        <Grid container spacing={3} justifyContent="flex-start" marginTop={2}>
          {uniqueLocations.map((location, index) => (
            <Grid item xs={12} key={index} >
              <DevicesComponents  location={location} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Devices;

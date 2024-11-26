import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize";
import DevicesComponents from "../components/devicesComponents/DevicesComponents";
import { getDeviceData } from "../api/DeviceDetailApi";
import { IDevice } from "../interface/IDevice";
import AddDevice from "./AddDevice"; // Import the AddDevice component

const Devices: React.FC = () => {
  const windowSize = useWindowSize();
  const [deviceList, setDeviceList] = useState<IDevice[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDeviceData();
        setDeviceList(data);
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, []);

  const uniqueLocations = Array.from(
    new Set(
      deviceList
        .map((device) => device.location)
        .filter((loc): loc is string => loc !== null)
    )
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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
            onClick={toggleModal}
            sx={{
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "8rem",
              height: "2.5rem",
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
            <Grid item xs={12} key={index}>
              <DevicesComponents location={location} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal for Add Device */}
      <Dialog open={isModalOpen} onClose={toggleModal} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6" component="div">
            New
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AddDevice /> {/* Render AddDevice form */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Devices;

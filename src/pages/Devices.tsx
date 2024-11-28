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
import AddDevice from "./AddDevice"; // Import the AddDevice component

interface DeviceDetails {
  location: string;
  room: string;
}

interface Device {
  _id: string;
  hostname: string;
  details: DeviceDetails | null;
}

const Devices: React.FC = () => {
  const windowSize = useWindowSize();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3000/host"); // API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const result = await response.json();
        setDevices(result.data); // Access the "data" property in the response
        setLoading(false); // Turn off loading
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false); // Turn off loading
      }
    };

    fetchDevices();
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Group devices by location
  const groupedDevices = devices.reduce((acc, device) => {
    const location = device.details?.location || "Unknown Location";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(device);
    return acc;
  }, {} as Record<string, any[]>);

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

      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          Object.entries(groupedDevices).map(([location, devices]) => (
            <Box key={location} sx={{ marginBottom: 4 }}>
              {/* Group Header */}
              <Typography variant="h5" fontWeight={600} sx={{ marginBottom: 2 }}>
                {location}
              </Typography>
              {/* Devices under this location */}
              <Grid container spacing={2}>
                {devices.map((device) => (
                  <Grid item xs={12} sm={6} md={4} key={device._id}>
                    <Box
                      sx={{
                        padding: 2,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {device.hostname}
                      </Typography>
                      <Typography variant="body2">
                        Room: {device.details?.room || "N/A"}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
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

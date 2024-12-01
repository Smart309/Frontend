import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import AddDevice from "./AddDevice";

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

const Devices: React.FC = () => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3000/host");
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const result = await response.json();
        setDevices(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleDeviceClick = (device: Device) => {
    navigate(`/devicedetail/${device.details.serialNo}`, {
      state: { device },
    });
  };

  const groupedDevices = devices.reduce((acc, device) => {
    const location = device.details?.location || "Unknown Location";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

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
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ marginBottom: 2, textAlign: "left", color: "blue" }}
              >
                {location}
              </Typography>
              <Grid container spacing={2}>
                {devices.map((device) => (
                  <Grid item xs={12} sm={6} md={4} key={device._id}>
                    <Button
                      onClick={() => handleDeviceClick(device)}
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        padding: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          color: "black",
                          width: "100%",
                          padding: 2,
                          border: "1px solid #ddd",
                          borderRadius: 2,
                          backgroundColor: "#f9f9f9",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <Typography variant="h6" fontWeight={600} sx={{}}>
                          {device.hostname}
                        </Typography>
                        <Typography variant="body2">
                          Room: {device.details?.Room || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Type: {device.details?.type || "N/A"}
                        </Typography>
                        <Typography variant="body2">
                          Serial: {device.details?.serialNo || "N/A"}
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Box>

      <Dialog open={isModalOpen} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle sx={{ borderBottom: 1, borderColor: "#a9a9a9" }}>
          <Typography variant="h6" component="div">
            New Device
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AddDevice onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Devices;

import React from "react";
import { Card, Box, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ComputerDevice from "../../assets/ComputerDevice.svg";
import { IDevice } from "../../interface/IDevice";

interface DevicesCardProps {
  device: IDevice;
}

const DevicesCard: React.FC<DevicesCardProps> = ({ device }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (device.status) {
      navigate("/devicedetail", { state: { device } });
    }
  };

  return (
    <ButtonBase
      onClick={handleClick}
      disabled={!device.status}
      sx={{
        width: "18.5rem",
        height: "9.5rem",
        textAlign: "left",
        opacity: device.status ? 1 : 0.5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: device.status ? "scale(1.05)" : "none",
          boxShadow: device.status ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          width: "100%",
          bgcolor: "#FFFFFB",
          borderRadius: "30px",
          position: "relative",
          boxShadow: "none",
          border: "3px solid #242D5D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ marginTop: "0.7rem" }}>
          <Typography
            variant="h6"
            component="div"
            color={"#242D5D"}
            sx={{
              transition: "color 0.3s ease",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                color: device.status ? "#3f51b5" : "#242D5D",
              },
            }}
          >
            {device.Dname || "Device Name"}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            right: "1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={ComputerDevice}
              alt="Computer Device"
              width={100}
              sx={{
                marginRight: "18px",
                transition: "transform 0.3s ease",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h6" component="div" color={"#242D5D"}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Room</span>
                  <span style={{ marginLeft: 10 }}>{device.room || "N/A"}</span>
                </Box>
              </Typography>
              <Typography variant="h6" component="div" color={"#242D5D"}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Status:</span>
                  <span
                    style={{
                      marginLeft: 10,
                      color: device.status ? "green" : "red",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {device.status ? "On" : "Off"}
                  </span>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </ButtonBase>
  );
};

export default DevicesCard;

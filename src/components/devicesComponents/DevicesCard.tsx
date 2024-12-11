import React from "react";
import { Card, Box, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IDevice } from "../../interface/IDevice";

interface DevicesCardProps {
  device: IDevice;
}

const DevicesCard: React.FC<DevicesCardProps> = ({ device }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (device.status) {
      navigate(`/devicedetail/${device.details.serialNo}`, { state: { device } });
    }
  };

  return (
    <ButtonBase
      onClick={handleClick}
      disabled={!device.status}
      sx={{
        width: "100%",
        textAlign: "left",
        opacity: device.status ? 1 : 0.5,
        "&:hover": {
          transform: device.status ? "scale(1.05)" : "none",
          boxShadow: device.status ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        },
      }}
    >
      <Card
        sx={{
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {device.hostname}
        </Typography>
        <Typography>Room: {device.details?.Room || "N/A"}</Typography>
        <Typography>Type: {device.details?.type || "N/A"}</Typography>
        <Typography>Serial: {device.details?.serialNo || "N/A"}</Typography>
      </Card>
    </ButtonBase>
  );
};

export default DevicesCard;
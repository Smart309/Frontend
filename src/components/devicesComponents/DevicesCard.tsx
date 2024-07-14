import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ComputerDevice from "../../assets/ComputerDevice.svg";
import { IDevice } from "../../interface/IDevice";

interface DevicesCardProps {
  device: IDevice; // รับพร็อพเพอร์ตี้ device ทั้งหมด
}

const DevicesCard: React.FC<DevicesCardProps> = ({ device }) => {
  return (
    <Card
      sx={{
        height: "9.5rem",
        width: "18.5rem",
        bgcolor: "#FFFFFB",
        borderRadius: "30px",
        position: "relative",
        boxShadow: "none",
        border: "3px solid #242D5D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginTop: "0.7rem" }}>
        <Link
          to="/devicedetail"
          state={{ device }}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="h6"
            component="div"
            color={"#242D5D"}
            sx={{
              cursor: "pointer",
              "&:focus": {
                outline: "none",
              },
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {device.Dname || "Device Name"}
          </Typography>
        </Link>
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
            sx={{ marginRight: "18px" }}
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
                <span style={{ marginLeft: 10 }}>
                  {device.status ? "On" : "Off"}
                </span>
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default DevicesCard;

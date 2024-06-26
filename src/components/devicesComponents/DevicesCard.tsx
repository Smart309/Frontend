import { Card, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ComputerDevice from "../../assets/ComputerDevice.svg";

const DevicesCard = () => {
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
        <Link to="/devicedetail">
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
            Device one
          </Typography>
        </Link>
      </Box>
      <Grid item justifyContent="center" alignItems="center">
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
                  <span style={{ marginLeft: 10 }}>401</span>
                </Box>
              </Typography>
              <Typography variant="h6" component="div" color={"#242D5D"}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Status : </span>
                  <span style={{ marginLeft: 10 }}>Off</span>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Card>
  );
};

export default DevicesCard;

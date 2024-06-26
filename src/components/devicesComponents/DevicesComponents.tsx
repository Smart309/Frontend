import { Card, Box, Typography, Grid } from "@mui/material";
import DevicesCard from "./DevicesCard";

const DevicesComponents = () => {
  return (
    <Card
      sx={{
        height: "15rem",
        width: "68rem", // Set width to 70rem (adjust as needed)
        bgcolor: "#FFFFFB",
        borderRadius: "30px",
        position: "relative",
        boxShadow: "none",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 1,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto", // Enable horizontal scrolling if content exceeds the card's width
      }}
    >
      <Typography
        variant="h6"
        component="div"
        color={"#21248B"}
        sx={{ alignSelf: "flex-start", paddingTop: 2 }}
      >
        30's Building
      </Typography>
      <Grid container justifyContent="center" marginTop={2}>
        <Grid item xs={9} sm={9} md={11} lg={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: 3,

              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: 13,
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "40px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#21248B",
                borderRadius: "40px",
              },
            }}
          >
            {Array.from(new Array(6)).map((_, index) => (
              <Box
                key={index}
                sx={{ minWidth: "20%", flex: "0 0 auto", marginBottom: 1.5 }}
              >
                <DevicesCard />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DevicesComponents;

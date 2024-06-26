import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize";
import DevicesComponents from "../components/devicesComponents/DevicesComponents";

const Dashboard = () => {
  const windowSize = useWindowSize();

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between", // Adjust alignment to space-between
            alignItems: "center", // Align items vertically
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
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "7rem",
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
            + Device
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
        <Grid container justifyContent="center" marginTop={2}>
          <Grid item xs={9} sm={9} md={11} lg={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: 3,
                marginBottom: 3,
              }}
            >
              {Array.from(new Array(3)).map((_, index) => (
                <Box
                  key={index}
                  sx={{ minWidth: "20%", flex: "0 0 auto", marginBottom: 2.5 }}
                >
                  <DevicesComponents />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

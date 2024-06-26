import { Box, Typography, Divider, Grid } from "@mui/material";

const DeviceDetailComponent = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: 5.5,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color={"#242D5D"}
          sx={{ fontSize: "1.5rem", textAlign: "left" }}
        >
          Device one
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "96%",
          backgroundColor: "gray",
          marginTop: 2,
          marginBottom: 2,
        }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginLeft: 7,
        }}
      >
        <Grid container sx={{ width: "90%" }}>
          <Grid item xs={12} sx={{ marginBottom: 2, marginTop: 1.5 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  fontWeight="medium"
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Hardware
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  CISCO1905/K9 (C1905 Router, 2 GE, HWIC-1T, CAB-SS-V35MT,
                  256F/256D, IPBase)
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Operating System
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Ubuntu 20.04
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  fontWeight="medium"
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Type
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Router
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Vendor
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  CISCO
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Location
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  30's Building
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  fontWeight="medium"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Room
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  401
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontWeight="medium"
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  Uptime
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  component="div"
                  color={"#000000"}
                  fontSize={18}
                  paddingBottom={0.5}
                  sx={{ textAlign: "left" }}
                >
                  10 hours 23 minutes 56 seconds
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DeviceDetailComponent;

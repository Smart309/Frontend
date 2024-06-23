import ManageComponent from "../components/ManageComponent";
import useWindowSize from "../hooks/useWindowSize";
import { Box, Typography } from "@mui/material";

const Management = () => {
  const windowSize = useWindowSize();

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 5,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            DEVICE MANAGEMENT
          </Typography>
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
        <Box
          sx={{
            backgroundColor: "#FFFFFB",
            flex: 1,
            display: "flex",
            borderRadius: 8,
            flexDirection: "column",
            justifyContent: windowSize.width >= 1100 ? "center" : "start",
            alignItems: "center",
            minHeight: "fit-content",
            // marginBottom: 5,
            // height: 1,
            py: 3,
            // pt: windowSize.width >= 1100 ? "15vh" : "0vh",
            // pb: "15vh",
            px: 3,
          }}
        >
          {windowSize.width < 1100 && (
            <Typography
              align="center"
              sx={
                {
                  // mt: "6rem",
                  // mb: "2rem",
                }
              }
            ></Typography>
          )}
          <ManageComponent />
        </Box>
      </Box>
    </>
  );
};

export default Management;

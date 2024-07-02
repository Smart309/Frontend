import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize";
import DeviceDetailComponent from "../components/devicesComponents/deviceDetail/DeviceDetailComponent";
import DeviceInterfaceComponent from "../components/devicesComponents/deviceDetail/DeviceInterfaceComponent";

const DeviceDetail = () => {
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
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            DEVICE'S DETAIL
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          width: 1,
          marginTop: 2,
          height: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFB",
            flex: 1,
            display: "flex",
            borderRadius: 8,
            flexDirection: "column",
            // justifyContent: windowSize.width >= 1100 ? "center" : "start",
            alignItems: "center",
            minHeight: "fit-content",
            marginBottom: 5,
            height: 1,
            py: 3,
            // pt: windowSize.width >= 1100 ? "15vh" : "0vh",
            // pb: "15vh",
          }}
        >
          <DeviceDetailComponent />
        </Box>
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between", // เปลี่ยนจาก flex-start เป็น space-between เพื่อให้ปุ่มชิดขวา
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight={600}
            color={"#242D5D"}
          >
            INTERFACE
          </Typography>
          <Button
            type="submit"
            sx={{
              color: "#FFFFFB",
              backgroundColor: "#F25A28",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "70px",
              width: "5.5rem",
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
            Graph
          </Button>
        </Box>

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
            marginBottom: 5,
            // height: 1,
            py: 3,
            // pt: windowSize.width >= 1100 ? "15vh" : "0vh",
            pb: 3,
          }}
        >
          {windowSize.width < 1100 && (
            <Typography
              align="center"
              sx={{
                mt: "6rem",
                mb: "2rem",
              }}
            ></Typography>
          )}
          <DeviceInterfaceComponent />
        </Box>
      </Box>
    </>
  );
};

export default DeviceDetail;

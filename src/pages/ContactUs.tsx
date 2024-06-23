import useWindowSize from "../hooks/useWindowSize";
import { Box, Typography } from "@mui/material";

const ContactUs = () => {
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
            CONTACT US
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
            justifyContent: "flex-start",
            alignItems: "flex-start",
            minHeight: "fit-content",
            py: 3,
            px: 3,
          }}
        >
          {windowSize.width < 1100 && (
            <Typography
              align="center"
              sx={{
                color: "#242D5D",
                fontWeight: 400,
                fontSize: 25,
              }}
            ></Typography>
          )}
          <Box
            sx={{
              position: "relative", // Set relative positioning
              width: "100%",
              height: "auto",
              borderRadius: "25px",
              pt: 5,
              background:
                "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(240,138,152,1) 0%, rgba(140,111,230,1) 100%)", // Add gradient background
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "25px",
              }}
              alt="Contact Us"
              src="./ContactUs.png"
            />
            <Box
              component="img"
              sx={{
                position: "absolute", // Position the additional image absolutely
                bottom: "80%", // Adjust as needed
                left: "29%", // Adjust as needed
                width: "15%", // Adjust size as needed
                height: "auto", // Adjust size as needed
                zIndex: 1, // Ensure it's below the other image
              }}
              alt="Book and Folder"
              src="./book.svg"
            />
          </Box>
          <Box
            component="img"
            sx={{
              position: "absolute", // Position the additional image absolutely
              bottom: "72%", // Adjust as needed
              right: "26%", // Adjust as needed
              width: "10%", // Adjust size as needed
              height: "auto", // Adjust size as needed
              zIndex: 1, // Ensure it's below the other image
            }}
            alt="Book and Folder"
            src="./folder.svg"
          />
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;

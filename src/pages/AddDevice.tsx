import useWindowSize from "../hooks/useWindowSize";
import { Box, Button, Typography, TextField } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const AddDevice = () => {
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
            New Host
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
            borderRadius: 3,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <Typography sx={{ color: "red" }}>*</Typography>
              <Typography sx={{ ml: 1 }}>Host name</Typography>
            </Box>
            <TextField
              sx={{
                width: "40%",
                textAlign: "right",
                mr: 44,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <Typography sx={{ ml: 2 }}>Templates</Typography>
            </Box>
            <TextField
              sx={{
                width: "40%",
                textAlign: "right",
                mr: 44,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <Typography sx={{ color: "red" }}>*</Typography>
              <Typography sx={{ ml: 1 }}>Host groups</Typography>
            </Box>
            <TextField
              sx={{
                width: "40%",
                textAlign: "right",
                mr: 44,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
          </Box>
          <Box sx={{ width: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 1,
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
                <Typography sx={{ ml: 2 }}>Interfaces</Typography>
                <Typography sx={{ ml: 10, color: "grey" }}>Type</Typography>
                <Typography sx={{ ml: 4, color: "grey" }}>
                  IP address
                </Typography>
                <Typography sx={{ ml: 12, color: "grey" }}>DNS name</Typography>
                <Typography sx={{ ml: 12, color: "grey" }}>
                  Connect to
                </Typography>
                <Typography sx={{ ml: 3, color: "grey" }}>Port</Typography>
                <Typography sx={{ ml: 10, color: "grey" }}>Default</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ ml: 27, mr: 3.5 }}>SNMP</Typography>
              <TextField
              sx={{
                width: "15%",
                textAlign: "right",
                mr: 1,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
              <TextField
              sx={{
                width: "15%",
                textAlign: "right",
                mr: 1,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
              <TextField
              sx={{
                width: "9%",
                textAlign: "right",
                mr: 1,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
              <TextField
              sx={{
                width: "10%",
                textAlign: "right",
                mr: 1,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
              <Typography
                sx={{
                  height: "auto",
                  textAlign: "right",
                  mr: 1,
                  minHeight: 1,
                  display: "flex",
                }}
              >
                <RadioButtonCheckedIcon sx={{ mr: 0.5 }} />
                remove
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Typography sx={{ ml: 27, mr: 3.5, color: "red" }}>*</Typography>
              <Typography sx={{ mr: 2 }}>SNMP version</Typography>
              <TextField
              sx={{
                width: "40%",
                textAlign: "right",
                mr: 30,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Typography sx={{ ml: 27, mr: 3.5, color: "red" }}>*</Typography>
              <Typography sx={{ mr: 2 }}>SNMP community</Typography>
              <TextField
              sx={{
                width: "40%",
                textAlign: "right",
                mr: 30,
              }}
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  height: "30px", // Set your desired height here
                },
              }}
            />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <Typography sx={{ ml: 2, mr: 1 }}>Description</Typography>
            </Box>
            <TextField sx={{
                width: "40%",
                textAlign: "right",
                mr: 44,
              }}
          id="outlined-multiline-static"
          multiline
          rows={4}
        />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Align buttons to the right
              textAlign: "right",
              width: 1,
              mt: 2, // Add margin-top for spacing if needed
            }}
          >
            <Button
              sx={{
                border: 1,
                borderRadius: 1,
                mr: 1,
                px: 2,
                color: "black",
              }}
            >
              Add
            </Button>
            <Button
              sx={{
                border: 1,
                borderRadius: 1,
                px: 2,
                color: "black",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddDevice;

import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useWindowSize from "../hooks/useWindowSize";
import DevicesComponents from "../components/devicesComponents/DevicesComponents";
import { getDetailsData } from "../api/DetailsApi";
import { IDetails } from "../interface/IDetails";

const Devices = () => {
  const windowSize = useWindowSize();
  const [detailsList, setDetailsList] = useState<IDetails[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailsData();
        setDetailsList(data);
      } catch (error) {
        console.error("Error fetching details data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations
  const uniqueLocations = Array.from(
    new Set(detailsList.map((detail) => detail.Location).filter((loc) => loc))
  ).filter((loc): loc is string => loc !== null); // Ensure all locations are strings

  return (
    <>
      {windowSize.width > 600 && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          flexDirection: "column", // Arrange items vertically
        }}
      >
        <Grid container spacing={3} justifyContent="flex-start" marginTop={2}>
          {uniqueLocations.map((location, index) => (
            <Grid item xs={12} key={index}>
              <DevicesComponents location={location} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Devices;

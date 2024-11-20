import React from "react";
import { Box, Stack} from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowSize from "../hooks/useWindowSize";
import Logo from "../assets/Logo.svg";

interface HeaderProps {
  isHideSidebar: boolean;
  handleHideSidebar: (width: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  isHideSidebar,
  handleHideSidebar,
}) => {
  const windowSize = useWindowSize();
  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        sx={{
          mb: "30px",
          marginLeft: 1,
        }}
      >
        {!isHideSidebar && windowSize.width >= 1100 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <img
              src={Logo}
              alt="Mycos"
              style={{
                width: 110,
                marginLeft: -12,
                height: "auto",
                marginRight: 15,
              }}
            />
          </Box>
        )}
        <IconButton
          onClick={() => handleHideSidebar(windowSize.width)}
          sx={{
            "&:focus": {
              outline: "none",
              color: "#242D5D",
            },
            "&:hover": {
              color: "#242D5D",
            },
            width: 55,
            height: 55,
          }}
        >
          <MenuIcon
            sx={{
              fontSize: 25,
            }}
          />
        </IconButton>
      </Stack>
    </>
  );
};
export default Header;

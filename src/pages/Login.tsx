import { useState } from "react";
import { Typography, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import NewLogo from "../assets/NewLogo.svg";
import LoginLeftside from "../assets/LoginLeftside.svg";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignIn = () => {
    const isAuthenticated = true;
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setError("Failed to sign in with CMU account");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* CMU Siren Logo */}
      <Box
        component="img"
        src={NewLogo}
        alt="CMU Siren Logo"
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          width: "20vh",
          height: "auto",
        }}
      />

      {/* Left Section */}
      <Box
        sx={{
          flex: 100,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url(${LoginLeftside})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vh",
          height: "100vh",
        }}
      ></Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 35,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          marginRight: 8,
          marginLeft: -15,
          bgcolor: "#ebf1ff",
          overflowY: "auto",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 1000,
            fontSize: "4.5rem",
            color: "#2c44b7",
            mb: 2,
            fontFamily: "Georgia, serif",
          }}
        >
          Welcome !
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "#2e2e2e",
            mb: 8,
            fontSize: "1.2rem",
          }}
        >
          Sign in to your Account
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#3e51c7",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "50px",
            maxWidth: "350px",
            width: "100%",
            outline: "none",
            "&:hover": {
              bgcolor: "#2c3a99",
            },
            "&:focus": {
              outline: "none",
            },
            "&:active": {
              outline: "none",
            },
          }}
          onClick={handleSignIn}
        >
          Sign in With CMU Account
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

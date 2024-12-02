import { useState } from "react";
import { Typography, TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const Login = () => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  // Screen is too small (smaller than iPad mini)
  if (windowSize.width < 768) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          bgcolor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          color="#242D5D"
          fontWeight={600}
          gutterBottom
          sx={{ mb: 2 }}
        >
          Device Resolution Notice
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, lineHeight: 1.6 }}
        >
          Your current device resolution does not meet the minimum requirements
          for optimal system operation. Please access this application using a
          device with a minimum display size equivalent to iPad mini (768px) or
          larger.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 1, // Full width of the screen
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0, // Remove padding
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%", // Ensure form is full width
          height: "100%", // Optional: Full height if needed
          bgcolor: "white",
          borderRadius: 0, // Remove border radius
          boxShadow: "none", // Remove shadow to blend with the background
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center", // Center content vertically
          alignItems: "center", // Center content horizontally
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "row",
            border: 1,
            borderRadius: 10,
            height: "70vh",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "blue",
              width: 1,
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
            }}
          ></Box>
          <Box sx={{ textAlign: "center", width: "100%", p: 10 }}>
            <Typography
              sx={{
                fontSize: "3rem",
                mb: 2,
                mt: 3,
                fontWeight: "bold",
                color: "#2A44FC",
              }}
            >
              CPE Siren
            </Typography>
            <Box sx={{ textAlign: "center", gap: 2 }}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                  width: "100%",
                  mb: 2,
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "darkblue", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "blue", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "blue", // Label color when focused
                  },
                }}
                label="Username"
                color="secondary"
                focused
              />

              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  width: "100%",
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "darkblue", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue", // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "blue", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "blue", // Label color when focused
                  },
                }}
                label="Password"
                color="secondary"
                type="password"
                focused
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  width: "100%", // Button spans full width
                  color: "white",
                  bgcolor: "#3B406C",
                  "&:hover": {
                    bgcolor: "#1a2142",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

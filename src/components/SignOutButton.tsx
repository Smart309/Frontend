import { Button } from "@mui/material";

export const SignOutButton = () => {
  return (
    <Button
      color="secondary"
      sx={{
        m: 0,
        marginLeft: "10px",
        fontSize: 13,
        fontWeight: 300,
        "&:focus": {
          outline: "none",
          color: "#FF4E4E",
        },
        "&:hover": {
          color: "#FF4E4E",
        },
      }}
    >
      Sign out
    </Button>
  );
};

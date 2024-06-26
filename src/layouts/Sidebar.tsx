import { Typography, Box, Stack } from "@mui/material";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate, useLocation } from "react-router";
import DnsIcon from "@mui/icons-material/Dns";
import CottageIcon from "@mui/icons-material/Cottage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";

interface SidebarProps {
  isHideSidebar: boolean;
  toggleSidebar: () => void;
}

export const SlideBarItems = [
  {
    id: 0,
    icon: <CottageIcon sx={{ fontSize: 20 }} />,
    name: "Dashboard",
    path: "/dashboard",
    newIcon: "",
  },
  {
    id: 1,
    icon: <DnsIcon sx={{ fontSize: 20 }} />,
    name: "Devices",
    path: "/devices",
    newIcon: "",
  },

  {
    id: 2,
    icon: <TimelineOutlinedIcon sx={{ fontSize: 20 }} />,
    name: "Graphs",
    path: "/graphs",
    newIcon: "",
  },
  {
    id: 4,
    icon: <CloudUploadIcon sx={{ fontSize: 20 }} />,
    name: "Storage",
    path: "/storage",
    newIcon: "",
  },
  {
    id: 5,
    icon: <SettingsIcon sx={{ fontSize: 20 }} />,
    name: "Management",
    path: "/management",
    newIcon: "",
  },
  {
    id: 6,
    icon: <ErrorIcon sx={{ fontSize: 22 }} />,
    name: "Alerts",
    path: "/alerts",
    newIcon: "",
  },
  {
    id: 7,
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />,
    name: "Contact Us",
    path: "/contactus",
    newIcon: "",
  },
];

export default function Sidebar({ isHideSidebar }: SidebarProps) {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack direction="column" spacing="10px">
      {SlideBarItems.map((item) => (
        <Box
          key={item.id}
          onClick={() => navigate(item.path)}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            p: "10px 25px",
            m: 0,
            backgroundColor:
              location.pathname === item.path ||
              (item.name === "Dashboard" && location.pathname.includes("-"))
                ? "#F25A28"
                : "transparent",
            color:
              location.pathname === item.path ||
              (item.name === "Dashboard" && location.pathname.includes("-"))
                ? "#FFFFFB"
                : "#242D5D",
            "&:hover": {
              backgroundColor:
                location.pathname !== item.path ? "#FFEAE3" : "#F25A28",
            },
            transition: "background-color 0.3s ease",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {item.icon}
            <Box
              sx={{
                overflow: "hidden",
                maxWidth: !isHideSidebar && windowSize.width >= 1100 ? "200px" : "0px",
                transition: "max-width 0.5s ease",
              }}
            >
              <Typography
                sx={{
                  marginLeft: "30px",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingRight: 1,
                  whiteSpace: "nowrap",
                  opacity: !isHideSidebar && windowSize.width >= 1100 ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Box>
          {item.newIcon && <span>{item.newIcon}</span>}
        </Box>
      ))}
    </Stack>
  );
}

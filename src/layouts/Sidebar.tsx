import React, { useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import DnsIcon from "@mui/icons-material/Dns";
import CottageIcon from "@mui/icons-material/Cottage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";
import DatabaseIcon from "@mui/icons-material/Storage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

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
    icon: <DatabaseIcon sx={{ fontSize: 20 }} />,
    name: "Data Collection",
    newIcon: "",
    subItems: [
      {
        id: "sub-1",
        icon: <DnsIcon sx={{ fontSize: 20 }} />,
        name: "Devices",
        path: "/devices",
        newIcon: "",
      },
      {
        id: "sub-2",
        icon: <DnsIcon sx={{ fontSize: 20 }} />,
        name: "Templates",
        path: "/templates",
        newIcon: "",
      },
    ],
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
  const [expandedItem, setExpandedItem] = useState<number | null>(
    location.pathname.includes('/devices') || location.pathname.includes('/templates') ? 1 : null
  );

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      if (expandedItem === item.id) {
        // If clicking on already expanded item, collapse it
        setExpandedItem(null);
      } else {
        // Expand the clicked item and navigate to first sub-item
        setExpandedItem(item.id);
        navigate(item.subItems[0].path);
      }
    } else {
      // For non-expandable items, just navigate and collapse any expanded item
      setExpandedItem(null);
      navigate(item.path);
    }
  };

  return (
    <Stack direction="column" spacing="10px">
      {SlideBarItems.map((item) => (
        <div key={item.id}>
          <Box
            onClick={() => handleItemClick(item)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "5px",
              p: "10px 25px",
              m: 0,
              backgroundColor:
                location.pathname === item.path ||
                item.subItems?.some((sub) => sub.path === location.pathname) ||
                (item.name === "Dashboard" && location.pathname.includes("-"))
                  ? "#F25A28"
                  : "transparent",
              color:
                location.pathname === item.path ||
                item.subItems?.some((sub) => sub.path === location.pathname) ||
                (item.name === "Dashboard" && location.pathname.includes("-"))
                  ? "#FFFFFB"
                  : "#242D5D",
              transition: "background-color 0.3s ease",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {item.icon}
              <Box
                sx={{
                  overflow: "hidden",
                  maxWidth:
                    !isHideSidebar && windowSize.width >= 1100
                      ? "200px"
                      : "0px",
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
            {item.subItems &&
              !isHideSidebar &&
              windowSize.width >= 1100 &&
              (expandedItem === item.id ? (
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              ) : (
                <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
              ))}
          </Box>

          {/* Sub-items */}
          {item.subItems && expandedItem === item.id && (
            <div>
              {item.subItems.map((subItem) => (
                <Box
                  key={subItem.id}
                  onClick={() => navigate(subItem.path)}
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "100px",
                    p: "5px 10px",
                    ml: "50px",
                    backgroundColor:
                      location.pathname === subItem.path
                        ? "#f57f58"
                        : "transparent",
                    color:
                      location.pathname === subItem.path
                        ? "#FFFFFB"
                        : "#242D5D",
                    "&:hover": {
                      backgroundColor:
                        location.pathname !== subItem.path
                          ? "#FFEAE3"
                          : "#F25A28",
                    },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        maxWidth:
                          !isHideSidebar && windowSize.width >= 1100
                            ? "200px"
                            : "0px",
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
                          opacity:
                            !isHideSidebar && windowSize.width >= 1100 ? 1 : 0,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        {subItem.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>
          )}
        </div>
      ))}
    </Stack>
  );
}
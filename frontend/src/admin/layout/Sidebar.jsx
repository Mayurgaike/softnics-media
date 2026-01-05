import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/admin" },
  { label: "Team", path: "/admin/team" },
  { label: "Services", path: "/admin/services" },
  { label: "Clients", path: "/admin/clients" },
  { label: "Blogs", path: "/admin/blogs" },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        Softnics Admin
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.active": {
                bgcolor: "#1e293b",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Typography
        variant="caption"
        sx={{ textAlign: "center", opacity: 0.6 }}
      >
        © {new Date().getFullYear()} Softnics Media
      </Typography>
    </Box>
  );
};

export default Sidebar;

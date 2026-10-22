import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon fontSize="small" /> },
  { label: "Team", path: "/admin/team", icon: <PeopleIcon fontSize="small" /> },
  { label: "Services", path: "/admin/services", icon: <MiscellaneousServicesIcon fontSize="small" /> },
  { label: "Clients", path: "/admin/clients", icon: <GroupsIcon fontSize="small" /> },
  { label: "Blogs", path: "/admin/blogs", icon: <ArticleIcon fontSize="small" /> },
];

const Sidebar = ({ onLogoutClick }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [internalConfirmOpen, setInternalConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      setInternalConfirmOpen(true);
    }
  };

  const handleDirectLogout = () => {
    setInternalConfirmOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const adminEmail = admin?.email || "Admin";
  const initial = adminEmail.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        bgcolor: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 3,
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box sx={{ mb: 3, px: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}
        >
          Softnics Admin
        </Typography>
        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
          Content Management
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1, py: 0 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === "/admin"}
            sx={{
              borderRadius: 1.5,
              mb: 0.8,
              py: 1,
              px: 1.5,
              color: "#94a3b8",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "#fff",
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
              "&.active": {
                bgcolor: "#1e293b",
                color: "#38bdf8",
                fontWeight: 700,
                "& .MuiListItemIcon-root": { color: "#38bdf8" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 600 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 2 }} />

      {/* Current Admin User Badge */}
      <Box
        sx={{
          p: 1.25,
          mb: 1.5,
          bgcolor: "rgba(255,255,255,0.05)",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#2563eb",
            fontSize: "0.85rem",
            fontWeight: 700,
          }}
        >
          {initial}
        </Avatar>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#f1f5f9",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.8125rem",
            }}
          >
            {adminEmail}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#10b981",
                display: "inline-block",
              }}
            />
            <Typography variant="caption" sx={{ color: "#10b981", fontSize: "0.7rem", fontWeight: 500 }}>
              Session Active
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Logout Button */}
      <Button
        fullWidth
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogoutClick}
        sx={{
          bgcolor: "#dc2626",
          "&:hover": { bgcolor: "#b91c1c" },
          fontWeight: 700,
          textTransform: "none",
          borderRadius: 2,
          py: 1,
          mb: 2,
          boxShadow: "0 2px 8px rgba(220,38,38,0.25)",
        }}
      >
        Logout
      </Button>

      <Typography
        variant="caption"
        sx={{ textAlign: "center", opacity: 0.5, fontSize: "0.7rem" }}
      >
        © {new Date().getFullYear()} Softnics Media
      </Typography>

      {/* Fallback Internal Confirmation Dialog */}
      <Dialog
        open={internalConfirmOpen}
        onClose={() => setInternalConfirmOpen(false)}
        PaperProps={{ sx: { borderRadius: 2.5, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out of the admin panel?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setInternalConfirmOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDirectLogout}
            startIcon={<LogoutIcon />}
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;

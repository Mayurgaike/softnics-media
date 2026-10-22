import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SEO from "../../components/seo/SEO";
import { useAuth } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = () => {
    setOpenLogout(false);
    logout();
    navigate("/login", { replace: true });
  };

  const adminEmail = admin?.email || "Admin";
  const initial = adminEmail.charAt(0).toUpperCase();

  return (
    <>
      <SEO title="Admin Panel | Softnics Media" noIndex />

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <Sidebar onLogoutClick={() => setOpenLogout(true)} />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
          }}
        >
          {/* Top Admin Header Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              px: { xs: 2, md: 4 },
              py: 1.5,
              position: "sticky",
              top: 0,
              zIndex: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ color: "#1e293b", display: { xs: "none", sm: "block" } }}
            >
              Softnics Media CMS
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: "auto" }}>
              <Tooltip title="View live public website">
                <Button
                  size="small"
                  variant="outlined"
                  component="a"
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<OpenInNewIcon fontSize="small" />}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.8125rem",
                    borderColor: "#cbd5e1",
                    color: "#475569",
                    borderRadius: 1.5,
                    "&:hover": {
                      borderColor: "#94a3b8",
                      bgcolor: "#f1f5f9",
                    },
                  }}
                >
                  View Website
                </Button>
              </Tooltip>

              <Chip
                avatar={
                  <Avatar sx={{ bgcolor: "#2563eb", width: 24, height: 24, fontSize: "0.75rem", fontWeight: 700 }}>
                    {initial}
                  </Avatar>
                }
                label={adminEmail}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  color: "#334155",
                  borderColor: "#e2e8f0",
                  display: { xs: "none", md: "inline-flex" },
                }}
              />

              <Button
                size="small"
                color="error"
                variant="contained"
                startIcon={<LogoutIcon fontSize="small" />}
                onClick={() => setOpenLogout(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  bgcolor: "#dc2626",
                  "&:hover": { bgcolor: "#b91c1c" },
                  boxShadow: "none",
                  borderRadius: 1.5,
                  px: 1.75,
                }}
              >
                Logout
              </Button>
            </Stack>
          </Box>

          {/* Main Outlet */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 2, md: 4 },
              py: 3,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        PaperProps={{ sx: { borderRadius: 2.5, p: 1, maxWidth: 420 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out of the admin panel?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your session will be closed and you will need to sign in again to access the admin panel.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenLogout(false)}
            sx={{ color: "text.secondary", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: "#dc2626",
              "&:hover": { bgcolor: "#b91c1c" },
              textTransform: "none",
              fontWeight: 700,
              px: 2.5,
              borderRadius: 1.5,
            }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminLayout;

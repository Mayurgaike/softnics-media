import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SEO from "../../components/seo/SEO";

const AdminLayout = () => {
  return (
    <>
      <SEO title="Admin Panel | Softnics Media" noIndex />

      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <Sidebar />

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
    </>
  );
};


export default AdminLayout;

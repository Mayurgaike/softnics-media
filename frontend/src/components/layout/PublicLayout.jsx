import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import NavBar from "./NavBar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const PublicLayout = () => {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <NavBar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </Box>
  );
};

export default PublicLayout;

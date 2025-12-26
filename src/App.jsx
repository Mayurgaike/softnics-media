import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";

import SocialBar from "./components/layout/SocialBar";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import PrivacyPolicy from "./pages/Policy";
import TermsConditions from "./pages/TermsConditions";
import WhatsAppButton from "./components/layout/WhatsAppButton";

import HomePage from "./pages/HomePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Portfolio from "./components/sections/Portfolio";

import BlogPage from "./pages/BlogPage"; // NEW
import BlogsPageDetail from "./pages/BlogsPageDetail"; // NEW

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* ⭐ BLOG ROUTES */}
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogsPageDetail />} />

        {/* LEGAL PAGES */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>

      <SocialBar />
      <Footer />
      <WhatsAppButton />
    </Box>
  );
};

export default App;

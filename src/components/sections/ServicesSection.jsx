// src/components/sections/ServicesSection.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SectionWrapper from "../common/SectionWrapper";
import { services } from "../../data/services";

import BrushIcon from "@mui/icons-material/Brush";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EastIcon from "@mui/icons-material/East";

const getServiceIcon = (key) => {
  switch (key) {
    case "design":
      return <BrushIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "marketing":
      return <TrendingUpIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "camera":
      return <PhotoCameraIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "video":
      return <VideoCallIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "podcast":
      return <HeadphonesIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "voice":
      return (
        <RecordVoiceOverIcon sx={{ fontSize: 40, color: "primary.main" }} />
      );
    case "website":
      return <LanguageIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    case "app":
      return <PhoneIphoneIcon sx={{ fontSize: 40, color: "primary.main" }} />;
    default:
      return <BrushIcon sx={{ fontSize: 40, color: "primary.main" }} />;
  }
};

const ServicesSection = () => {
  const navigate = useNavigate();

  const goToService = (service) => {
    // Scrolls to top when navigating
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Navigate to service detail page
    navigate(`/services/${service.slug}`);
  };

  return (
    <SectionWrapper
      id="services"
      title="Our Services"
      subtitle="Creative, Digital & Technology Solutions Under One Roof"
      bg="white"
    >
     <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(1, 1fr)", // ⭐ 1 per row on mobile
      sm: "repeat(1, 1fr)", // ⭐ 1 per row on small tablets
      md: "repeat(2, 1fr)", // ⭐ 2 per row on tablets
      lg: "repeat(3, 1fr)", // ⭐ 3 per row on laptops/desktops
    },
    gap: { xs: 2, sm: 3, md: 4 },
    px: { xs: 1, sm: 2 },
  }}
>

        {services.map((service) => (
          <Box
            key={service.title}
            onClick={() => goToService(service)}
            sx={{
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              backgroundColor: "white",
              transition: "0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              alignItems: "flex-start",

              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                transform: "translateY(-5px)",
              },
            }}
          >
            {/* ICON */}
            <Box sx={{ mb: 1 }}>{getServiceIcon(service.icon)}</Box>

            {/* TITLE */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
              }}
            >
              {service.title}
            </Typography>

            {/* DESCRIPTION */}
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              {service.description}
            </Typography>

            {/* ARROW */}
            <EastIcon
              sx={{
                fontSize: 20,
                color: "grey.600",
                cursor: "pointer",
                mt: 1,
                transition: "0.2s",

                "&:hover": {
                  color: "primary.main",
                  transform: "translateX(4px)",
                },
              }}
              onClick={() => goToService(service)}
            />
          </Box>
        ))}
      </Box>
    </SectionWrapper>
  );
};

export default ServicesSection;

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
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {services.map((service) => (
          <Box
            key={service.title}
            onClick={() => goToService(service)}
            sx={{
              width: { xs: "100%", sm: "47%", md: "30%" },
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              p: 3,
              backgroundColor: "white",
              transition: "0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "&:hover": {
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                transform: "translateY(-5px)",
              },
            }}
          >
            {getServiceIcon(service.icon)}

            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "text.primary", mt: 1 }}
            >
              {service.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.6 }}
            >
              {service.description}
            </Typography>

            <EastIcon
              sx={{
                fontSize: 20,
                color: "grey.600",
                cursor: "pointer",
                mt: 1,
                transition: "0.2s",
                alignSelf: "flex-end",
                "&:hover": { color: "primary.main", transform: "translateX(4px)" },
              }}
              // stops click bubbling from being required, but still routes:
              onClick={() => goToService(service)}
            />
          </Box>
        ))}
      </Box>
    </SectionWrapper>
  );
};

export default ServicesSection;

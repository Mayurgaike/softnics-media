import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../common/SectionWrapper";
import { fetchServices } from "../../api/api";
import EastIcon from "@mui/icons-material/East";

const ServicesSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
  }, []);
  useEffect(() => {
    console.log("services state updated:", services);
  }, [services]);

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
            xs: "repeat(1, 1fr)", 
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)", 
            lg: "repeat(3, 1fr)", 
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
            <Box
              component="img"
              src={service.icon}
              alt={service.title}
              sx={{
                width: 40,
                height: 40,
                objectFit: "contain",
                mb: 1,
              }}
            />

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

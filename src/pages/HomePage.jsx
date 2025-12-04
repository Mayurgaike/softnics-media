// src/pages/HomePage.jsx
import React from "react";
import Box from "@mui/material/Box";

import HeroSlider from "../components/sections/HeroSlider";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import MissionVisionSection from "../components/sections/MissionVisionSection";
import ClientsSection from "../components/sections/ClientsSection";
import TeamSection from "../components/sections/TeamSection";
import ContactSection from "../components/sections/ContactSection";

const HomePage = () => {
  return (
    <Box>
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <MissionVisionSection />
      <ClientsSection />
      <TeamSection />
      <ContactSection />
    </Box>
  );
};

export default HomePage;

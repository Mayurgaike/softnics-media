import React from "react";
import Box from "@mui/material/Box";

import ScrollReveal from "../components/common/ScrollReveal";

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

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <MissionVisionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <ClientsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <TeamSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <ContactSection />
      </ScrollReveal>
    </Box>
  );
};

export default HomePage;

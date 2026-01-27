import React from "react";
import Box from "@mui/material/Box";

import ScrollReveal from "../components/common/ScrollReveal";
import SEO from "../components/seo/SEO";
import HeroSlider from "../components/sections/HeroSlider";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import MissionVisionSection from "../components/sections/MissionVisionSection";
import ClientsSection from "../components/sections/ClientsSection";
import TeamSection from "../components/sections/TeamSection";
import ContactSection from "../components/sections/ContactSection";

const HomePage = () => {
  return (
    <>
      <SEO
        title="Best Digital Marketing Agency in Nashik | Softnics Media"
        description="Softnics Media is a leading digital marketing agency in Nashik offering SEO, social media marketing, branding, web development and performance marketing."
        keywords="digital marketing agency in Nashik, SEO services Nashik, social media marketing Nashik"
        canonical="https://www.softnicsmedia.com/"
      />
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
    </>
  );
};

export default HomePage;

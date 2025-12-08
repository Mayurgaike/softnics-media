// src/components/sections/AboutSection.jsx
import React from "react";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";
import SectionWrapper from "../common/SectionWrapper";
import aboutImage from "../../assets/about-us.png"; // <-- ensure this path is correct

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      title="About Us"
      subtitle="Redefining Digital Marketing Since 2020"
      bg="white"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          alignItems: "center",
          mt: 2,
          // bgcolor:"red",
          minWidth:'100%'
        }}
      >
        {/* LEFT: Illustration / Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={aboutImage}
            alt="About Softnics Media"
            sx={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 1,
              objectFit: "cover",
              boxShadow: 4,
              aspectRatio:16/13,
            }}
          />
        </Box>

        {/* RIGHT: Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}
          >
            Redefining Digital Marketing Since 2020
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.8 }}
          >
            At Softnics Media, we blend strategic insight with creative execution and
            modern technology to deliver measurable growth for our clients. Since our
            launch in 2020, our passionate team has helped businesses scale, engage new
            audiences, and build strong digital identities across platforms.
          </Typography>

          {/* Short summary bullets */}
          <Box sx={{ mb: 2 }}>
            <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
              <li>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Data-driven digital strategies tailored to your business goals.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Creative services — branding, graphic design, video & podcast production.
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  End-to-end delivery: web & app development, marketing, analytics and reporting.
                </Typography>
              </li>
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Partner with us and we'll craft a customised roadmap — combining brand
            design, performance marketing, content production and technical execution —
            so you can focus on your business while we scale your digital impact.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              href="#contact"
              sx={{ py: 1.25 }}
            >
              Discuss A Project
            </Button>
            <Button
              variant="outlined"
              href="/services"
              sx={{ py: 1.25 }}
            >
              Explore Services
            </Button>
          </Stack>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default AboutSection;

// src/components/sections/MissionVisionSection.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import SectionWrapper from "../common/SectionWrapper";

// Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // For Trackable
import ShowChartIcon from "@mui/icons-material/ShowChart";

// SMART Items (6 Boxes)
const SMART_ITEMS = [
  { icon: <TrendingUpIcon fontSize="large" />, label: "Specific" },
  { icon: <BarChartIcon fontSize="large" />, label: "Measurable" },
  { icon: <InsightsIcon fontSize="large" />, label: "Achievable" },
  { icon: <UpgradeIcon fontSize="large" />, label: "Relevant" },
  { icon: <TrackChangesIcon fontSize="large" />, label: "Trackable" },
  { icon: <ShowChartIcon fontSize="large" />, label: "Time-Bound" },
];

const MissionVisionSection = () => {
  return (
    <SectionWrapper
      id="mission-vision"
      title="Our Mission & Vision"
      subtitle="Guiding every strategy, shaping every success."
      bg="white"
    >
      {/* ---------------- Mission & Vision Section (Kept Same) ---------------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: { xs: 6, md: 8 },
        }}
      >
        {/* Mission Card */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 6px 20px rgba(15,23,42,0.04)",
            position: "relative",
            overflow: "hidden",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: 6,
              height: "100%",
              bgcolor: "#0B63F8",
              borderRadius: "6px 0 0 6px",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Our Mission
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            To empower brands with innovative creative solutions that blend strategy,
            technology, and storytelling — helping businesses grow, build meaningful
            connections, and achieve measurable success.
          </Typography>
        </Box>

        {/* Vision Card */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 6px 20px rgba(15,23,42,0.04)",
            position: "relative",
            overflow: "hidden",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: 6,
              height: "100%",
              bgcolor: "#0B63F8",
              borderRadius: "6px 0 0 6px",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Our Vision
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            To become the most trusted digital growth partner — delivering meaningful
            experiences, inspiring creativity, and helping brands thrive in a rapidly
            evolving digital world.
          </Typography>
        </Box>
      </Box>

      {/* ---------------- WHY CHOOSE US (Left Text + Right Grid) ---------------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 5,
          mt: 8,
        }}
      >
        {/* -------- LEFT TEXT AREA -------- */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
            }}
          >
            Why Choose Us?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "420px",
              mb: 2,
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            We follow the SMART approach to deliver results that are 
            efficient, measurable, and truly impactful helping your 
            brand grow with clarity and purpose.Our process is practical,
            data-informed and focus on long-term,measurable outcomes.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            “Success is not an accident —it’s the result of smart actions,
            strategic planning and creative execution.”
          </Typography>
        </Box>

        {/* -------- RIGHT GRID OF BOXES (3 IN EACH ROW) -------- */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {SMART_ITEMS.map((item, i) => (
            <Box
              key={i}
              sx={{
                height: 120,
                borderRadius: 2,
                bgcolor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 28px rgba(15,23,42,0.06)",
                transition: "0.3s ease",
                textAlign: "center",

                "&:hover": {
                  boxShadow: "0 14px 36px rgba(15,23,42,0.12)",
                  
                },
              }}
            >
              <Box sx={{ fontSize: 30, color: "#0B63F8" }}>{item.icon}</Box>

              <Typography
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default MissionVisionSection;

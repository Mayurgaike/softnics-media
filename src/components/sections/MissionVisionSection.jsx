// src/components/sections/MissionVisionSection.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import SectionWrapper from "../common/SectionWrapper";

// Icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SearchIcon from "@mui/icons-material/Search";

// SMART Items
const SMART_ITEMS = [
  { icon: <TrendingUpIcon fontSize="large" />, label: "Specific" },
  { icon: <BarChartIcon fontSize="large" />, label: "Measurable" },
  { icon: <InsightsIcon fontSize="large" />, label: "Achievable" },
  { icon: <UpgradeIcon fontSize="large" />, label: "Relevant" },
  { icon: <TrackChangesIcon fontSize="large" />, label: "Trackable" },
  { icon: <ShowChartIcon fontSize="large" />, label: "Time-Bound" },
];

const MissionVisionSection = () => {
  // typing effect for search bar text (runs only once)
  const fullText = "Efficient & Consistent With Achievable!";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper
      id="mission-vision"
      title="Our Mission & Vision"
      subtitle="Guiding every strategy, shaping every success."
      bg="white"
    >
      {/* ---------------- Mission & Vision Section (UNCHANGED) ---------------- */}
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

      {/* ---------------- WHY CHOOSE SOFTNICS TEXT ---------------- */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 2,
          textAlign: "center",
        }}
      >
        Why Hire Us
      </Typography>

      {/* Google-style Search Bar */}
      <Box
        sx={{
          mx: "auto",
          width: { xs: "90%", sm: "65%", md: "50%" },
          display: "flex",
          alignItems: "center",
          bgcolor: "white",
          borderRadius: "40px",
          border: "1px solid #E5E7EB",
          px: 3,
          py: 1.5,
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            color: "Blue",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          {displayText || "Search..."}
        </Typography>

        <Box
          sx={{
            width: 34,
            height: 34,
            bgcolor: "white",
            borderRadius: "50%",
            border: "1px solid #d1d5db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <SearchIcon sx={{ color: "#1f2937", fontSize: 22 }} />
        </Box>
      </Box>

      {/* Why Choose Softnics description */}
      <Typography
        sx={{
          color: "royalBlue",
          textAlign: "center",
          maxWidth: 700,
          mx: "auto",
          mb: 3,
          lineHeight: 1.6,
        }}
      >
        At Softnics Media, we focus on clarity, precision, and smart execution.  
        Our SMART-driven approach ensures your business grows with consistent,  
        measurable, and impactful results, powered by creativity, strategy,  
        and technology.
      </Typography>

      <Typography
        sx={{
          fontStyle: "italic",
          color: "royalBlue",
          textAlign: "center",
          mb: 5,
        }}
      >
        “Success is not an accident — it’s a result of smart actions,
        strategic planning, and creative execution.”
      </Typography>

      {/* ---------------- SMART CARDS 3×2 GRID (SMALL BOXES) ---------------- */}
      {/* ---------------- SMART CARDS (PERFECT SMALL FLEXBOX LAYOUT) ---------------- */}
{/* SMART CARDS (3 × 2 layout) */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { xs: 2, md: 3 },
    mt: 4,
  }}
>
  {SMART_ITEMS.map((item, i) => (
    <Box
      key={i}
      sx={{
        width: { xs: "46%", sm: "30%", md: "28%" },   // PERFECT SIZE
        height: 140,                                  // SMALL & CLEAN BOX
        borderRadius: "22px",
        bgcolor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.3s",
        textAlign: "center",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ fontSize: 34, color: "#0052FF", mb: 1 }}>
        {item.icon}
      </Box>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "#111",
        }}
      >
        {item.label}
      </Typography>
    </Box>
  ))}
</Box>


    </SectionWrapper>
  );
};

export default MissionVisionSection;

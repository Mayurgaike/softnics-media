import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";

import {
  Lightbulb,
  RocketLaunch,
  ShoppingCart,
  Campaign,
  BarChart,
} from "@mui/icons-material";


import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";


import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SearchIcon from "@mui/icons-material/Search";
import HubIcon from "@mui/icons-material/Hub";
import ComputerIcon from "@mui/icons-material/Computer";
import BrushIcon from "@mui/icons-material/Brush";
import SettingsIcon from "@mui/icons-material/Settings";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;

    let incrementTime = 20;
    let step = end / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};


const Portfolio = () => {
  const clients = useCounter(200);
  const leads = useCounter(100000);
  const adSpend = useCounter(2000000);
  const reach = useCounter(3000000);
  const roas = useCounter(4);
  const retention = useCounter(95);
  const niches = useCounter(15);

  return (
    <Box sx={{ width: "100%", bgcolor: "#f8faff" }}>

     
      <Box
        sx={{
          textAlign: "center",
          py: 10,
          background: "linear-gradient(135deg,#0066ff,#46a0ff)",
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={3}>
          Our Performance & Results
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.95, mt: 1 }}>
          Real numbers that define our success
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{
            mt: 8,
            maxWidth: "1300px",
            margin: "auto",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {[
            { label: "Clients Served", value: clients + "+" },
            { label: "Qualified Leads", value: leads.toLocaleString() + "+" },
            { label: "Ad Spend Managed", value: "₹" + adSpend.toLocaleString() },
            { label: "Monthly Reach", value: reach.toLocaleString() + "+" },
            { label: "Average ROAS", value: roas + "X" },
            { label: "Client Retention", value: retention + "%" },
            { label: "Industry Niches", value: niches + "+" },
          ].map((item, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{ textAlign: "center" }}
              >
                <Box
                  sx={{
                    width: { xs: 130, md: 150 },
                    height: { xs: 130, md: 150 },
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "#0066ff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                    fontWeight: 700,
                    fontSize: { xs: "22px", md: "26px" },
                  }}
                >
                  {item.value}
                </Box>

                <Typography sx={{ mt: 2, opacity: 0.9, fontSize: "16px" }}>
                  {item.label}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

    
      <Box sx={{ width: "100%", py: 10, px: 2, background: "#f5f9ff" }}>
        <Box sx={{ maxWidth: "1500px", mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            mb={6}
            color="primary.main"
          >
            Our Core Services
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              flexWrap: "nowrap",
              overflowX: { xs: "visible", md: "auto" },
              gap: 4,
              pb: 2,
              justifyContent: { md: "flex-start" },
            }}
          >
            {[
              {
                id: 1,
                title: "Performance Advertising",
                icon: <Lightbulb sx={{ fontSize: 34, color: "#1e88ff" }} />,
                points: [
                  "Meta Ads (Facebook & Instagram)",
                  "Google Ads (Search, Display, YouTube)",
                  "LinkedIn Ads",
                  "TikTok & Emerging Platforms",
                ],
              },
              {
                id: 2,
                title: "Lead Generation Systems",
                icon: <RocketLaunch sx={{ fontSize: 34, color: "#1e88ff" }} />,
                points: [
                  "High-converting landing pages",
                  "Funnel strategy & optimization",
                  "CRM & automation setup",
                  "Lead qualification & tracking",
                ],
              },
              {
                id: 3,
                title: "E-commerce Growth",
                icon: <ShoppingCart sx={{ fontSize: 34, color: "#1e88ff" }} />,
                points: [
                  "Conversion-focused creatives",
                  "Catalog & retargeting campaigns",
                  "ROAS optimization",
                  "Scaling strategies",
                ],
              },
              {
                id: 4,
                title: "Branding & Reach Campaigns",
                icon: <Campaign sx={{ fontSize: 34, color: "#1e88ff" }} />,
                points: [
                  "Engagement campaigns",
                  "Viral creative strategies",
                  "Influencer ads",
                  "Video-first approach",
                ],
              },
              {
                id: 5,
                title: "Analytics & Optimization",
                icon: <BarChart sx={{ fontSize: 34, color: "#1e88ff" }} />,
                points: [
                  "Pixel & GA4 tracking setup",
                  "Daily performance monitoring",
                  "A/B testing & scaling",
                  "Weekly reporting",
                ],
              },
            ].map((service, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: { xs: "100%", md: "260px" },
                  maxWidth: { xs: "100%", md: "260px" },
                  position: "relative",
                  textAlign: "center",
                  flexShrink: 0,
                  mt: { xs: 7, md: 10 },
                  overflow: "visible",
                }}
              >
                {/* BADGE */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "-32px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#1e88ff,#6ab3ff)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "20px",
                    zIndex: 999,
                    border: "4px solid white",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  {service.id}
                </Box>

                {/* CARD */}
                <Box
                  sx={{
                    background: "white",
                    borderRadius: "18px",
                    padding: "65px 20px 25px",
                    border: "2px solid transparent",
                    height: "100%",
                    transition: "0.3s",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",

                    "&:hover": {
                      borderColor: "#1e88ff",
                      transform: { md: "translateY(-6px)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      mx: "auto",
                      borderRadius: "50%",
                      background: "rgba(30,136,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {service.icon}
                  </Box>

                  <Typography variant="h6" fontWeight={700} mb={2}>
                    {service.title}
                  </Typography>

                  {service.points.map((p, i) => (
                    <Typography
                      key={i}
                      sx={{ opacity: 0.85, mb: 1, fontSize: "14.5px" }}
                    >
                      • {p}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 10, px: 2, background: "#f7faff" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={6}
          color="#0a2a6b"
        >
          Key Performance Metrics
        </Typography>

        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 4,
          }}
        >
          {[
            {
              icon: <GroupsIcon />,
              value: "200+",
              label: "Clients Worked With",
            },
            {
              icon: <CheckCircleIcon />,
              value: "100,000+",
              label: "Leads Generated",
            },
            {
              icon: <TrendingUpIcon />,
              value: "3M+",
              label: "Monthly Reach",
            },
            {
              icon: <BarChartIcon />,
              value: "4X",
              label: "Average ROAS",
            },
            {
              icon: <TrendingDownIcon />,
              value: "Up to 60%",
              label: "CPL Reduction",
            },
            {
              icon: <ShowChartIcon />,
              value: "Up to 3.5X",
              label: "Conversion Rate Improvement",
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: "100%",
                  sm: "48%",
                  md: "31.5%",
                },
                height: "240px",
                borderRadius: "18px",
                background: "#eef4ff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                transition: "0.3s",
                "&:hover": {
                  background: "#d3e4ff",
                  boxShadow: "0 12px 26px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(0,102,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  color: "#0066ff",
                  mb: 2,
                }}
              >
                {item.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  color: "#003a9d",
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  opacity: 0.85,
                  mt: 1,
                  fontSize: "15px",
                  textAlign: "center",
                  maxWidth: "80%",
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      
      <Box
        sx={{
          py: 10,
          px: 3,
          background: "linear-gradient(180deg, #f7faff, #eef4ff)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={6}
          color="#0a2a6b"
        >
          Case Study Highlights
        </Typography>

        <Box
          sx={{
            maxWidth: "1250px",
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {[
            {
              title: "Real Estate Lead Generation",
              list: ["4.5X ROAS", "8500+ Leads in 60 days", "52% CPL Drop"],
              icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#0066ff" }} />,
              bg: "linear-gradient(135deg,#e3f0ff,#ffffff)",
            },
            {
              title: "E-commerce Brand Scaling",
              list: ["5X ROAS", "+210% Revenue Increase", "₹3,50,000+ Ad Spend"],
              icon: <ShoppingCart sx={{ fontSize: 40, color: "#0066ff" }} />,
              bg: "linear-gradient(135deg,#e3faff,#ffffff)",
            },
            {
              title: "Coaching & Education",
              list: ["4X ROAS", "3M+ Monthly Reach", "12,000+ Leads"],
              icon: <Campaign sx={{ fontSize: 40, color: "#0066ff" }} />,
              bg: "linear-gradient(135deg,#e9f4ff,#ffffff)",
            },
          ].map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ width: "100%", maxWidth: "350px" }}
            >
              <Card
                sx={{
                  height: "320px",
                  borderRadius: "18px",
                  padding: "32px 26px",
                  background: cs.bg,
                  border: "1px solid #dbe9ff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                    background: "rgba(0,102,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {cs.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                  sx={{ color: "#003a9d" }}
                >
                  {cs.title}
                </Typography>

                {cs.list.map((l, i) => (
                  <Typography
                    key={i}
                    sx={{
                      mb: 1,
                      opacity: 0.85,
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 18, color: "#0066ff" }} />{" "}
                    {l}
                  </Typography>
                ))}
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

     
      <Box sx={{ py: 10, px: 3, background: "#f3f7ff" }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={6}
          color="primary.main"
        >
          Industries We Serve
        </Typography>

        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            background: "white",
            borderRadius: "20px",
            padding: "35px 30px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            border: "2px solid #d7e6ff",
            position: "relative",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 40,
              width: "2px",
              height: "100%",
              background: "rgba(0,102,255,0.15)",
            },
          }}
        >
          {[
            "Real Estate",
            "E-commerce",
            "Education & Coaching",
            "Healthcare",
            "Finance & Insurance",
            "Local Businesses",
            "SaaS & Tech",
            "Hospitality & Travel",
            "Personal Brands",
          ].map((industry, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 1.3,
                borderBottom:
                  index !== 8 ? "1px dashed rgba(0,0,0,0.08)" : "none",
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(0,102,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0066ff",
                  fontWeight: 700,
                }}
              >
                ✓
              </Box>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#003a9d",
                }}
              >
                {industry}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

<Box sx={{ mt: 10, textAlign: "center" }}>
  {/* SIMPLE SECTION TITLE */}
  <Typography
    variant="h4"
    fontWeight={800}
    textAlign="center"
    mb={6}
    sx={{
      color: "#0a2a6b",
      fontFamily: "Georgia, serif",
      letterSpacing: "0.5px",
    }}
  >
    <span style={{ color: "#0066ff", fontSize: "34px" }}>“</span>
    What Our Clients Say
    <span style={{ color: "#0066ff", fontSize: "34px" }}>”</span>
  </Typography>

</Box>

<Box
  sx={{
    position: "relative",
    height: { xs: "420px", md: "px" },
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mt: 2,
  }}
>
  
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url("/src/assets/results/Bg.png")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.55) blur(1px)",
    }}
  />

  
  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      width: "100%",
      maxWidth: "700px",
      textAlign: "center",
      px: 2,
    }}
  >
    <Slider
      dots={true}
      infinite={true}
      autoplay={true}
      arrows={false}
      speed={600}
      autoplaySpeed={3500}
      pauseOnHover={false}
    >
      
      <Box sx={{ color: "white" }}>
        <img
          src="/src/assets/results/avatar1.png"
          alt="avatar1"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "3px solid white",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Alex Johnson
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>E-Commerce Brand Owner</Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "17px", md: "20px" },
            fontWeight: 500,
            color: "white",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          “We scaled our business with consistent leads and a strong ROAS. One of the best agencies we’ve worked with.”
        </Typography>
      </Box>

      
      <Box sx={{ color: "white" }}>
        <img
          src="/src/assets/results/avatar2.png"
          alt="avatar2"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "3px solid white",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Rohan Mehta
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>Real Estate Developer </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "17px", md: "20px" },
            fontWeight: 500,
            color: "white",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          “Professional, responsive, and performance-focused. Our ad results improved within 30 days.”
        </Typography>
      </Box>

      
      <Box sx={{ color: "white" }}>
        <img
          src="/src/assets/results/avatar3.png"
          alt="avatar3"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "3px solid white",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
          Sarah Williams
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>Coach & Consultant</Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "17px", md: "20px" },
            fontWeight: 500,
            color: "white",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          “They don’t just run ads — they build systems that converts!”
        </Typography>
      </Box>
    </Slider>
  </Box>
</Box>


      
      <Box sx={{ py: 8, px: 3, background: "#eef4ff" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          mb={5}
          color="primary.main"
        >
          Tools & Platforms We Use
        </Typography>

        <Box
          sx={{
            maxWidth: "600px",
            mx: "auto",
            background: "#ffffff",
            borderRadius: "18px",
            p: { xs: 3, md: 4 },
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
            position: "relative",
            border: "1.5px solid #dbe8ff",
            "&::before": {
              content: '""',
              position: "absolute",
              left: "40px",
              top: 0,
              bottom: 0,
              width: "3px",
              background: "#8bb6ff",
            },
          }}
        >
          {/* LIST ITEMS */}
          <Box sx={{ pl: 6 }}>
            {[
              {
                name: "Meta Ads Manager",
                icon: (
                  <PhoneIphoneIcon sx={{ fontSize: 26, color: "#0066ff" }} />
                ),
              },
              {
                name: "Google Ads",
                icon: <SearchIcon sx={{ fontSize: 26, color: "#0066ff" }} />,
              },
              {
                name: "GA4 Analytics",
                icon: <BarChartIcon sx={{ fontSize: 26, color: "#0066ff" }} />,
              },
              {
                name: "HubSpot / Zoho CRM",
                icon: <HubIcon sx={{ fontSize: 26, color: "#0066ff" }} />,
              },
              {
                name: "ClickFunnels / WordPress",
                icon: (
                  <ComputerIcon sx={{ fontSize: 26, color: "#0066ff" }} />
                ),
              },
              {
                name: "Canva / Adobe Suite",
                icon: <BrushIcon sx={{ fontSize: 26, color: "#0066ff" }} />,
              },
              {
                name: "Zapier Automations",
                icon: <SettingsIcon sx={{ fontSize: 26, color: "#0066ff" }} />,
              },
            ].map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1.2,
                  }}
                >
                  <Box sx={{ mr: 2 }}>{tool.icon}</Box>

                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#003a9d",
                    }}
                  >
                    {tool.name}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Portfolio;

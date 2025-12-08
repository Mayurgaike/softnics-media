import { Box, Typography, Container } from "@mui/material";
import Slider from "react-slick";

import hero1 from "../../assets/hero/hero1.jpg";
import hero2 from "../../assets/hero/hero2.jpg";
import hero3 from "../../assets/hero/hero3.jpg";
import hero4 from "../../assets/hero/hero4.jpg";
import hero5 from "../../assets/hero/hero5.jpg";

const slides = [
  {
    image: hero1,
    title: "Redefining Digital Marketing Since 2020",
    subtitle: "Strategic, Creative & Technology-Driven Solutions.",
  },
  {
    image: hero2,
    title: "Grow Your Brand With Data-Driven Digital Marketing",
    subtitle: "Social Media • SEO • Performance Ads • Lead Generation",
  },
  {
    image: hero3,
    title: "Capture, Create & Inspire With Professional Visual Content",
    subtitle: "Photoshoots • Videography • Reels • Corporate Films",
  },
  {
    image: hero4,
    title: "Your Trusted Partner For Sustainable Business Growth",
    subtitle: "Build Connections. Drive Results. Scale With Confidence.",
  },
  {
    image: hero5,
    title: "End-to-End Creative & Digital Solutions Under One Roof",
    subtitle: "Design • Marketing • Production • Web • App Development",
  },
];

const HeroSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        height: "100vh", // FULL SCREEN
        minHeight: 500, // fallback for small screens
        bgcolor: "primary.main",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              position: "relative",
              height: "100vh",
              minHeight: 500,
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // ensures no cropping issues
                filter: "brightness(0.55)",
              }}
            />

            {/* TEXT */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                px: { xs: 2, md: 6 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  maxWidth: 700,
                  mb: 1,
                  lineHeight: 1.2,
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  opacity: 0.85,
                  maxWidth: 600,
                  lineHeight: 1.4,
                }}
              >
                {slide.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;

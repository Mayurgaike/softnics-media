import { Box } from "@mui/material";
import Slider from "react-slick";

import hero1 from "../../assets/hero/hero1.jpg";
import hero2 from "../../assets/hero/hero2.jpg";
import hero3 from "../../assets/hero/hero3.jpg";

const slides = [
  { image: hero1 },
  { image: hero2 },
  { image: hero3 },
];

const HeroSlider = () => {
  const settings = {
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
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              position: "relative",
              height: { xs: "auto", md: "100vh" },
              minHeight: { md: 500 },
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt="Digital Marketing Agency in Nashik – Softnics Media"
              sx={{
                width: "100%",
                height: { xs: "auto", md: "100%" },
                maxHeight: { xs: "70vh", md: "100%" },

                objectFit: { xs: "contain", md: "cover" },
                objectPosition: "center",

                display: "block",
              }}
            />

            {/* TEXT AREA (desktop only hero style) */}
            <Box
              sx={{
                position: { md: "absolute" },
                inset: { md: 0 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 2, sm: 3, md: 6 },  
                maxWidth: "800px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;

import { Box, Typography, Container } from '@mui/material';
import Slider from 'react-slick';

import hero1 from '../../assets/hero/placeholder.png';
import hero2 from '../../assets/hero/placeholder.png';
import hero3 from '../../assets/hero/placeholder.png';

const slides = [
  { image: hero1, title: 'Redefining Digital Marketing Since 2020' },
  { image: hero2, title: 'Creative, Data-Driven Growth For Your Brand' },
  { image: hero3, title: 'From Strategy To Execution, End-to-End' },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        height: { xs: 280, md: 420 },
        bgcolor: 'primary.main',
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <Box
            key={idx}
            sx={{
              position: 'relative',
              height: { xs: 280, md: 420 },
            }}
          >
            <Box
              component="img"
              src={slide.image}
              alt={slide.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.55)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Container>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    maxWidth: 600,
                  }}
                >
                  {slide.title}
                </Typography>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;

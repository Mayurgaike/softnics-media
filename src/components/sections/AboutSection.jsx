import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import SectionWrapper from '../common/SectionWrapper';

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      title="About Us"
      subtitle="Redefining Digital Marketing Since 2020"
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="text.secondary">
            At Softnics Media, we blend strategic insight with innovative technology to craft
            data-driven strategies, compelling creative communication, and seamless end-to-end
            execution that truly moves the needle for your business.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Since 2020, our passionate team has been helping brands scale their services,
              expand into new markets, and attract clients who value meaningful connections.
              Together, we create the perfect recipe for digital success.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* You can replace with an illustration / stats / image */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 3,
              p: 4,
              color: 'white',
              boxShadow: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Why Brands Choose Us
            </Typography>
            <Typography variant="body2">
              • Data-driven digital strategies <br />
              • End-to-end creative & execution <br />
              • Measurable, growth-focused outcomes
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default AboutSection;

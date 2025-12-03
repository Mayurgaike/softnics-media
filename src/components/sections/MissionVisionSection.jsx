// src/components/sections/MissionVisionSection.jsx
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import SectionWrapper from '../common/SectionWrapper';

const MissionVisionSection = () => {
  return (
    <SectionWrapper
      id="mission-vision"
      title="Mission & Vision"
      subtitle="Driving growth, inspiring innovation."
      bg="background.paper"
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: 2,
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Our Mission
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To empower brands to reach their fullest potential through the perfect blend of
              creativity, strategic insight and cutting-edge technology—crafting campaigns that
              engage audiences, build loyalty and drive measurable, lasting results.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'white',
              boxShadow: 2,
              borderLeft: '4px solid',
              borderColor: 'secondary.main',
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Our Vision
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To become the most trusted growth partner for businesses of all sizes—delivering
              strategies that spark action, create meaningful connections and help brands thrive
              in a rapidly changing digital landscape.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default MissionVisionSection;

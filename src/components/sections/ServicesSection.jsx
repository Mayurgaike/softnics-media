// src/components/sections/ServicesSection.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import SectionWrapper from '../common/SectionWrapper';
import { services } from '../../data/services';

const ServicesSection = () => {
  return (
    <SectionWrapper
      id="services"
      title="Services"
      subtitle="Everything your brand needs under one roof."
      bg="white"
    >
      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={6} sm={4} md={3} key={service.title}>
            <Card
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                height: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default ServicesSection;

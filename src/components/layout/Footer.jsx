import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'white', color: '#0046C7', py: 2, mt: 6 }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Softnics Media. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

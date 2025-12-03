import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const SectionWrapper = ({ id, title, subtitle, children, bg = 'transparent' }) => {
  return (
    <Box id={id} sx={{ py: { xs: 6, md: 8 }, bgcolor: bg }}>
      <Container>
        {title && (
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;

// src/components/layout/SocialBar.jsx
import React from 'react';
import { Box, IconButton, Container } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialBar = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 0.5 }}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 14,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MailOutlineIcon sx={{ fontSize: 18 }} />
          <span>softnicsmedia@gmail.com</span>
          <PhoneIcon sx={{ fontSize: 18, ml: 2 }} />
          <span>+91 99212 23986 / 093093 56702</span>
        </Box>
        <Box>
          <IconButton size="small" color="inherit">
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit">
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit">
            <WhatsAppIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit">
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default SocialBar;

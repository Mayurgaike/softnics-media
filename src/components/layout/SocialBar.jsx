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
    <Box
      sx={{
        bgcolor: '#F5F9FF',
        color: '#0046C7',
        mb: '-50px',
        pt: '10px',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 14,
          minWidth: '80%',
        }}
      >
        {/* LEFT INFO */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MailOutlineIcon sx={{ fontSize: 18 }} />
          <span>softnicsmedia@gmail.com</span>
{/* 
          <PhoneIcon sx={{ fontSize: 18, ml: 2 }} />
          <span>+91 99212 23986 / 093093 56702</span> */}
        </Box>

        {/* SOCIAL LINKS */}
        <Box>
          <IconButton
            size="small"
            component="a"
            href="https://www.facebook.com/softnicsmedia"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <FacebookIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            component="a"
            href="https://www.instagram.com/softnicsmedia_com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <InstagramIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            component="a"
            href="https://wa.me/919767713420"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            component="a"
            href="https://www.linkedin.com/company/softnics-media/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default SocialBar;

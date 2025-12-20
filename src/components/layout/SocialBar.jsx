import React from "react";
import { Box, IconButton, Container } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const SocialBar = () => {
  return (
    <Box
      sx={{
        bgcolor: "#E8F0FF",
        color: "#0046C7",
        py: "10px",
        
        // mb: '-60px',
      }}
    >
      <Container
        // maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          // textAlign: { xs: "center", md: "left" },
          gap: { xs: 1, md: 0 },
          minWidth: "80%",
        }}
      >
      
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 0.5, md: 2 },
            fontSize: 14,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MailOutlineIcon sx={{ fontSize: 18 }} />
            <span>softnicsmedia@gmail.com</span>
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIcon sx={{ fontSize: 18 }} />
            <span>+91 99212 23986 / 093093 56702</span>
          </Box> */}
        </Box>

        
        <Box sx={{ mt: { xs: 1, md: 0 } }}>
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

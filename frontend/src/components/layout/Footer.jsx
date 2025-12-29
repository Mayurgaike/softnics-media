import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/#services" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact", path: "/#contact" },
  ];

  const services = [
    "Graphic Designing",
    "Digital Marketing",
    "Photo and Video Shoot",
    "Video Editing",
    "Podcast Studio",
    "Voice Artist and Recording",
    "Website and Application Development",
  ];

  return (
    <Box sx={{ bgcolor: "#1a2332", color: "#fff" }}>
      {/* Main Footer Content */}
      <Container sx={{ py: 6, minWidth: "80%" }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "#0046C7",
                  borderRadius: "8px",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                SM
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Softnics Media
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ mb: 3, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
            >
              Transforming businesses through innovative digital solutions. We
              build software that drives growth and delivers results.
            </Typography>

            {/* Social Icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://www.facebook.com/softnicsmedia"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0046C7" },
                  width: 40,
                  height: 40,
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.instagram.com/softnicsmedia_com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0046C7" },
                  width: 40,
                  height: 40,
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>

              <IconButton
                component="a"
                href="https://wa.me/919767713420"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0046C7" },
                  width: 40,
                  height: 40,
                }}
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.linkedin.com/company/softnics-media/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  "&:hover": { bgcolor: "#0046C7" },
                  width: 40,
                  height: 40,
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Our Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, fontSize: 18 }}
            >
              Our Services
            </Typography>
            <Stack spacing={1.5}>
              {services.map((service, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {service}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, fontSize: 18 }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <MailOutlineIcon
                  sx={{ fontSize: 20, color: "#0046C7", mt: 0.3 }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    softnicsmedia@gmail.com
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    support@softnics.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <PhoneIcon sx={{ fontSize: 20, color: "#0046C7", mt: 0.3 }} />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    +91 99212 23986
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    +91 93093 56702
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", }}>
                <LocationOnIcon
                  sx={{ fontSize: 20, color: "#0046C7", mt: 0.3 }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    6th Floor, Roongta Business Hub
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Nashik, Maharashtra
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          py: 3,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            minWidth: "80%",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}
          >
            © {new Date().getFullYear()} Softnics Media. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 1, md: 3 },
            }}
          >
            <Typography
              variant="body2"
              component={Link}
              to="/privacy-policy"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                "&:hover": { color: "#0046C7" },
                transition: "color 0.2s",
              }}
            >
              Privacy Policy
            </Typography>

            <Typography
              variant="body2"
              component={Link}
              to="/terms-conditions"
              sx={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                "&:hover": { color: "#0046C7" },
                transition: "color 0.2s",
              }}
            >
              Terms of Service
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

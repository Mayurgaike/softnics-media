import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  useScrollTrigger,
  Slide,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

// Hide navbar on scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Main navigation items except Services (we'll insert it manually at position 3)
const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "clients", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact Us" },
];

// Services dropdown list
const serviceList = [
  "Graphics Designing",
  "Digital Marketing",
  "Photo & Video Shoot",
  "Video Editing",
  "Podcast Studio",
  "Voice Artist & Recording",
  "Website Development",
  "Application Development",
];

const NavBar = () => {
  const trigger = useScrollTrigger({ threshold: 10 });

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(null);

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: trigger ? "white" : "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
          color: "text.primary",
          borderBottom: trigger ? "1px solid #e5e7eb" : "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: 80,
            }}
          >
            {/* LOGO */}
            <Box
              component={motion.img}
              src={logo}
              alt="Softnics Media"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              sx={{
                height: 70,
                cursor: "pointer",
                objectFit: "contain",
              }}
            />

            {/* DESKTOP MENU */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3,
                alignItems: "center",
              }}
            >
              {sections.map((section, index) => (
                <React.Fragment key={section.id}>

                  {/* INSERT SERVICES DROPDOWN BUTTON ONLY AT POSITION 3 */}
                  {index === 2 && (
                    <Button
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      endIcon={<ExpandMoreIcon />}
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        textTransform: "none",
                        color: "text.primary",
                        px: 1,
                        "&:hover": {
                          color: "primary.main",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Services
                    </Button>
                  )}

                  {/* NORMAL NAVIGATION BUTTONS */}
                  <ScrollLink
                    to={section.id}
                    smooth
                    offset={-90}
                    duration={500}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        textTransform: "none",
                        color: "text.primary",
                        px: 1,
                        transition: "0.3s ease",
                        "&:hover": {
                          color: "primary.main",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {section.label}
                    </Button>
                  </ScrollLink>
                </React.Fragment>
              ))}

              {/* SERVICES DROPDOWN MENU */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 4,
                  sx: { mt: 1, borderRadius: 2 },
                }}
              >
                {serviceList.map((service, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      fontWeight: 500,
                      py: 1,
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white",
                      },
                    }}
                    onClick={() => setAnchorEl(null)}
                  >
                    {service}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* MOBILE MENU BUTTON */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={(e) => setMobileAnchor(e.currentTarget)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            {/* MOBILE MENU — WITHOUT SERVICES DROPDOWN */}
            <Menu
              anchorEl={mobileAnchor}
              open={Boolean(mobileAnchor)}
              onClose={() => setMobileAnchor(null)}
              PaperProps={{
                elevation: 3,
                sx: { width: 260, borderRadius: 3, p: 1 },
              }}
            >
              {sections.map((section) => (
                <MenuItem key={section.id} onClick={() => setMobileAnchor(null)}>
                  <ScrollLink
                    to={section.id}
                    smooth
                    offset={-80}
                    duration={500}
                    style={{ width: "100%", fontWeight: 600 }}
                  >
                    {section.label}
                  </ScrollLink>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default NavBar;

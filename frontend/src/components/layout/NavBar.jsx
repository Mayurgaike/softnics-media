//navbar.jsx

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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// 🔥 UPDATED: removed Team, added Blog
const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "portfolio-page", label: "Portfolio" },
  { id: "blog", label: "Blogs" }, // NEW
  { id: "contact", label: "Contact Us" },
];

// 🔥 UPDATED: removed Team, added Blog
const sections_mobile = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "portfolio-page", label: "Portfolio" },
  { id: "blog", label: "Blogs" }, // NEW
  { id: "contact", label: "Contact Us" },
];

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

const serviceSlugMap = {
  "Graphics Designing": "graphics-designing",
  "Digital Marketing": "digital-marketing",
  "Photo & Video Shoot": "photo-video-shoot",
  "Video Editing": "video-editing",
  "Podcast Studio": "podcast-studio",
  "Voice Artist & Recording": "voice-artist",
  "Website Development": "website-development",
  "Application Development": "application-development",
};

const NavBar = () => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({ threshold: 10 });

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(null);

  const handleScrollNav = (sectionId) => {
    // 🔥 NEW: Blog page navigation
    if (sectionId === "blog") {
      navigate("/blogs");
      return;
    }

    if (sectionId === "portfolio-page") {
      navigate("/portfolio");
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

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
        <Container sx={{ minWidth: "100%" }}>
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
                height: 80,
                cursor: "pointer",
                objectFit: "contain",
              }}
              onClick={() => handleScrollNav("hero")}
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
                <React.Fragment key={index}>
                  {/* Insert Services at position 3 */}
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

                  <Button
                    onClick={() => handleScrollNav(section.id)}
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
                    {section.label}
                  </Button>
                </React.Fragment>
              ))}

              {/* SERVICES DROPDOWN */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 4,
                  sx: { mt: 1, borderRadius: 1 },
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
                    onClick={() => {
                      setAnchorEl(null);
                      const slug = serviceSlugMap[service];
                      navigate(`/services/${slug}`);
                    }}
                  >
                    {service}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={(e) => setMobileAnchor(e.currentTarget)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <Menu
              anchorEl={mobileAnchor}
              open={Boolean(mobileAnchor)}
              onClose={() => setMobileAnchor(null)}
              PaperProps={{
                elevation: 3,
                sx: { width: 260, borderRadius: 3, p: 1 },
              }}
            >
              {sections_mobile.map((section) => (
                <MenuItem
                  key={section.id}
                  onClick={() => {
                    setMobileAnchor(null);
                    handleScrollNav(section.id);
                  }}
                  sx={{ fontWeight: 600 }}
                >
                  {section.label}
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

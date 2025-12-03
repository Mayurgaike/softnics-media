import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../../assets/logo.png';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'clients', label: 'Result' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact Us' },
];

const NavBar = () => {
  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid #E5E7EB' }}
      >
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src={logo}
                alt="Softnics Media"
                sx={{ height: 40, objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {sections.map((section) => (
                <ScrollLink
                  key={section.id}
                  to={section.id}
                  smooth
                  offset={-90}
                  duration={500}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    color="inherit"
                    sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}
                  >
                    {section.label}
                  </Button>
                </ScrollLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default NavBar;

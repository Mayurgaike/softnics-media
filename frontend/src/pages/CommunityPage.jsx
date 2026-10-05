import React from 'react';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import SEO from '../components/seo/SEO';

const CommunityPage = () => {
  const whatsappLink = "https://chat.whatsapp.com/H8nJp7o5EgPJIBGHfxwgTm";

  return (
    <>
      <SEO 
        title="Join Our Community | Softnics Media"
        description="Join our WhatsApp community."
      />
      <Container maxWidth="sm">
        <Box 
          sx={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8
          }}
        >
          <Paper 
            elevation={3} 
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'background.paper'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary.main">
              Join Our WhatsApp Community
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Stay updated with the latest news, announcements, and connect with like-minded individuals in our exclusive WhatsApp community.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#25D366',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#128C7E',
                }
              }}
            >
              Join WhatsApp Group
            </Button>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default CommunityPage;

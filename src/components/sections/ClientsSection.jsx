import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import Slider from 'react-slick';
import SectionWrapper from '../common/SectionWrapper';
import { clients } from '../../data/clients';

const ClientsSection = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <SectionWrapper
      id="clients"
      title="Our Clients"
      subtitle="Brands that trust us with their digital growth."
      bg="white"
    >
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        <Slider {...settings}>
          {clients.map((client) => (
            <Box key={client.id} sx={{ px: 1.5 }}>
              {/* CLIENT CARD */}
              <Box
                onClick={() => setSelectedClient(client)}
                sx={{
                  cursor: 'pointer',
                  height: 160,
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid #e6e6e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  transition: 'all 0.35s ease',

                  boxShadow: '0 3px 10px rgba(0,0,0,0.06)',

                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.03)',   // perfect lift + scale
                    boxShadow: '0 14px 32px rgba(0, 80, 200, 0.18)', // soft bloom
                    borderColor: '#4A90E2',                        // SUBTLE BORDER HIGHLIGHT
                  },
                }}
              >
                <Box
                  component="img"
                  src={client.logo}
                  alt={client.name}
                  sx={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'contain',
                    transition: '0.35s ease',

                    '&:hover': {
                      transform: 'scale(1.06)',   // logo slight zoom (premium)
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* CLIENT DETAILS MODAL */}
      <Dialog
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', pr: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="img"
                  src={selectedClient.logo}
                  alt={selectedClient.name}
                  sx={{ height: 50, objectFit: 'contain' }}
                />
                <Typography variant="h6">{selectedClient.name}</Typography>
              </Box>

              <IconButton
                onClick={() => setSelectedClient(null)}
                sx={{ position: 'absolute', right: 12, top: 12 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {selectedClient.shortSummary}
              </Typography>

              <ul style={{ paddingLeft: '1.2rem', marginTop: 0 }}>
                {selectedClient.details.map((line, i) => (
                  <li key={i}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {line}
                    </Typography>
                  </li>
                ))}
              </ul>

              {/* SOCIAL ICONS */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {selectedClient.links.youtube && (
                  <IconButton
                    href={selectedClient.links.youtube}
                    target="_blank"
                    sx={{ color: '#FF0000' }}
                  >
                    <YouTubeIcon fontSize="large" />
                  </IconButton>
                )}

                {selectedClient.links.instagram && (
                  <IconButton
                    href={selectedClient.links.instagram}
                    target="_blank"
                    sx={{ color: '#E1306C' }}
                  >
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                )}

                {selectedClient.links.facebook && (
                  <IconButton
                    href={selectedClient.links.facebook}
                    target="_blank"
                    sx={{ color: '#1877F2' }}
                  >
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                )}
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </SectionWrapper>
  );
};

export default ClientsSection;

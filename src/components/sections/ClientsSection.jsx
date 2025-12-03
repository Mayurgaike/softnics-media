import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    speed: 600,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  };

  const handleOpen = (client) => setSelectedClient(client);
  const handleClose = () => setSelectedClient(null);

  return (
    <SectionWrapper
      id="clients"
      title="Our Clients"
      subtitle="Brands that trust us with their digital growth."
      bg="white"
    >
      <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
        <Slider {...settings}>
          {clients.map((client) => (
            <Box key={client.id} sx={{ px: 1 }}>
              <Box
                onClick={() => handleOpen(client)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: 'white',
                  borderRadius: 3,
                  border: '1px solid #E5E7EB',
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 1,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {client.logo ? (
                  <Box
                    component="img"
                    src={client.logo}
                    alt={client.name}
                    sx={{ maxHeight: 50, maxWidth: '90%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography variant="subtitle2" sx={{ px: 2, textAlign: 'center' }}>
                    {client.name}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Modal for details */}
      <Dialog open={!!selectedClient} onClose={handleClose} fullWidth maxWidth="md">
        {selectedClient && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', pr: 5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {selectedClient.logo && (
                  <Box
                    component="img"
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    sx={{ height: 40, objectFit: 'contain' }}
                  />
                )}
                <Typography variant="h6">{selectedClient.name}</Typography>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{ position: 'absolute', right: 12, top: 12 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedClient.shortSummary}
              </Typography>
              <ul style={{ paddingLeft: '1.25rem', marginTop: 0 }}>
                {selectedClient.details.map((d, i) => (
                  <li key={i}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {d}
                    </Typography>
                  </li>
                ))}
              </ul>

              {selectedClient.links && (
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                  {selectedClient.links.youtube && (
                    <Chip
                      label="YouTube"
                      component="a"
                      href={selectedClient.links.youtube}
                      target="_blank"
                      clickable
                      variant="outlined"
                    />
                  )}
                  {selectedClient.links.instagram && (
                    <Chip
                      label="Instagram"
                      component="a"
                      href={selectedClient.links.instagram}
                      target="_blank"
                      clickable
                      variant="outlined"
                    />
                  )}
                  {selectedClient.links.facebook && (
                    <Chip
                      label="Facebook"
                      component="a"
                      href={selectedClient.links.facebook}
                      target="_blank"
                      clickable
                      variant="outlined"
                    />
                  )}
                </Stack>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </SectionWrapper>
  );
};

export default ClientsSection;

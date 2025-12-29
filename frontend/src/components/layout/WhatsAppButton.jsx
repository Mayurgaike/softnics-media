import React from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const phone = '919767713420'; 

  const handleClick = () => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <Fab
      color="success"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1500,
        boxShadow: 6,
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;

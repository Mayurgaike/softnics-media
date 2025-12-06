import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import SectionWrapper from '../common/SectionWrapper';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted', form);

    // Open WhatsApp with message
    const phone = '919921223986'; // use main WhatsApp number
    const text =
      `Hi, I am ${form.name || ''}.\n` +
      `Phone: ${form.phone || ''}\n` +
      `Email: ${form.email || ''}\n` +
      `Message: ${form.message || ''}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <SectionWrapper
      id="contact"
      title="Contact Us"
      subtitle="Let’s connect and unlock your business potential."
      bg="white"
    >
      {/* Main row: info + form side by side */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // stacked on mobile, side-by-side on md+
          gap: 4,
          alignItems: 'space-around',
          mt: 10,
        }}
      >
        {/* LEFT: info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Get in Touch
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                +91 99212 23986 / 093093 56702
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <EmailIcon fontSize="small" />
              <Typography variant="body2">softnicsmedia@gmail.com</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <GoogleIcon fontSize="small" />
              <Typography variant="body2">
                6th Floor, Roongta Business Hub, 6074, Agra - Mumbai Hwy,
                near Indira Nagar Underpass, Nashik, Maharashtra 422009
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Follow us
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href="https://www.instagram.com/softnicsmedia_com"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/softnicsmedia"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://share.google/7FrFLUQ16WaAsCPqX"
              target="_blank"
            >
              <GoogleIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* RIGHT: form card */}
        <Box
          sx={{
            minWidth: 0,
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            boxShadow: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Let&apos;s Talk To Us
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Unlock your business potential with our expert solutions!!
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                size="small"
                name="name"
                label="Enter Your Name"
                fullWidth
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="phone"
                label="Phone Number"
                fullWidth
                value={form.phone}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="email"
                label="Enter Your Email Id"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                size="small"
                name="message"
                label="Message"
                fullWidth
                multiline
                minRows={3}
                value={form.message}
                onChange={handleChange}
              />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ mt: 1 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.2 }}
                >
                  Send
                </Button>

                {/* Explicit WhatsApp button inside form */}
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<WhatsAppIcon />}
                  onClick={handleSubmit}
                >
                  Connect on WhatsApp
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </SectionWrapper>
  );
};

export default ContactSection;

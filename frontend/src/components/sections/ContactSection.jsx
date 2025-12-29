import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";

import SectionWrapper from "../common/SectionWrapper";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ReCAPTCHA from "react-google-recaptcha";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptcha = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    if (!form.name || !form.phone || !form.email || !form.message) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const phone = "919767713420";

    const text =
      `Hi, I am ${form.name}.\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Message: ${form.message}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Contact Us"
      subtitle="Let’s connect and unlock your business potential."
      bg="white"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 6,
          mt: 6,
        }}
      >
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Get in Touch
          </Typography>

          <Stack spacing={3} sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2}>
              <PhoneIcon color="primary" />
              <Typography variant="body1">
                +91 99212 23986 <br /> +91 93093 56702
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <EmailIcon color="primary" />
              <Typography variant="body1">softnicsmedia@gmail.com</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <LocationOnIcon color="primary" />
              <Typography variant="body1">
                6th Floor, Roongta Business Hub, Nashik
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Follow Us
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              href="https://www.instagram.com/softnicsmedia_com"
              target="_blank"
              sx={{ bgcolor: "#F4F5F7" }}
            >
              <InstagramIcon color="primary" />
            </IconButton>

            <IconButton
              href="https://www.facebook.com/softnicsmedia"
              target="_blank"
              sx={{ bgcolor: "#F4F5F7" }}
            >
              <FacebookIcon color="primary" />
            </IconButton>

            <IconButton
              href="https://share.google/7FrFLUQ16WaAsCPqX"
              target="_blank"
              sx={{ bgcolor: "#F4F5F7" }}
            >
              <GoogleIcon color="primary" />
            </IconButton>
          </Stack>
        </Box>

        
        <Paper
          elevation={5}
          sx={{
            flex: 1,
            p: { xs: 3, md: 3 },
            borderRadius: 1,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Let's Talk
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Unlock your business potential today.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Your Name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                name="phone"
                label="Phone Number"
                fullWidth
                required
                value={form.phone}
                onChange={handleChange}
              />

              <TextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                name="message"
                label="Your Message"
                fullWidth
                multiline
                minRows={3}
                required
                value={form.message}
                onChange={handleChange}
              />

             
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptcha}
              />

              
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ pt: 1 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                    boxShadow: "0 6px 18px rgba(37, 99, 235, 0.35)",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(90deg, #1e40af, #2563eb)",
                      boxShadow: "0 8px 22px rgba(30, 64, 175, 0.45)",
                    },
                  }}
                >
                  Send
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </SectionWrapper>
  );
};

export default ContactSection;

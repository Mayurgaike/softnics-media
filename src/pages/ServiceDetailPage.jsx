import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { services } from "../data/services";
import { styled } from "@mui/material/styles";

const Bullet = styled("li")(({ theme }) => ({
  marginBottom: theme.spacing(1.2),
}));

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          Service Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The service you are looking for does not exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/"
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: "linear-gradient(#f9fbff, #ffffff)" }}>
      <Container maxWidth="md">

        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/"
          sx={{
            mb: 4,
            borderRadius: 3,
            px: 2.5,
            py: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            background: "#fff",
            "&:hover": { background: "#f1f5f9" },
          }}
        >
          Back to Home
        </Button>

        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: "primary.main",
            }}
          >
            {service.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Elevating your brand with powerful digital & creative solutions.
          </Typography>

          <Chip
            label={`Category: ${service.title}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Main Content Card */}
        <Card
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            mb: 4,
          }}
        >
          <CardContent>

            {/* Introduction */}
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              At Softnics Media, we help brands stand out with strategic creative,
              marketing, and technology services. Our goal is to deliver impactful
              results that help businesses grow and achieve digital excellence.
            </Typography>

            {/* Service Intro */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1.5, color: "primary.main" }}
            >
              What we do in {service.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              {service.intro}
            </Typography>

            {/* Offerings List */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 1, mt: 2 }}
            >
              Key Offerings:
            </Typography>

            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              {service.offerings.map((item) => (
                <Bullet key={item}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {item}
                  </Typography>
                </Bullet>
              ))}
            </Box>

            {/* Closing */}
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              {service.closing}
            </Typography>
          </CardContent>
        </Card>

        
        {/* CTA Buttons */}
<Stack
  direction="row"
  spacing={2}
  justifyContent="center"
  sx={{ mt: 4, flexWrap: "wrap" }}
>
  {/* Button Style Once */}
  {[
    {
      label: "Discuss this service",
      to: "/#contact",
    },
    {
      label: "Explore all services",
      to: "/#services",   // ⭐ FIXED: scroll to Services section
    },
  ].map((btn) => (
    <Button
      key={btn.label}
      variant="contained"
      size="large"
      component={RouterLink}
      to={btn.to}
      sx={{
        borderRadius: 3,
        px: 4,
        py: 1.2,
        fontWeight: 600,
        background: "linear-gradient(90deg, #2563eb, #3b82f6)",
        boxShadow: "0 6px 18px rgba(37, 99, 235, 0.35)",
        textTransform: "none",
        "&:hover": {
          background: "linear-gradient(90deg, #1e40af, #2563eb)",
          boxShadow: "0 8px 22px rgba(30, 64, 175, 0.45)",
        },
      }}
    >
      {btn.label}
    </Button>
  ))}
</Stack>

      </Container>
    </Box>
  );
};

export default ServiceDetailPage;

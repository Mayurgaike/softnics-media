import React, { useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // ⭐ Always scroll page to TOP on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
        <Button variant="contained" startIcon={<ArrowBackIcon />} component={RouterLink} to="/">
          Back to Home
        </Button>
      </Container>
    );
  }

  const handleBackToServices = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Box
      sx={{
        py: { xs: 5, md: 10 },
        background: "linear-gradient(#f9fbff, #ffffff)",
      }}
    >
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToServices}
          sx={{
            mb: 4,
            borderRadius: 3,
            px: 2.5,
            py: 1,
            background: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            "&:hover": { background: "#f1f5f9" },
            fontWeight: 600,
          }}
        >
          Back to Services
        </Button>

        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: "primary.main",
              fontSize: { xs: "1.9rem", md: "2.4rem" },
            }}
          >
            {service.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}
          >
            Elevating your brand with powerful digital & creative solutions.
          </Typography>

          <Chip
            label={`Category: ${service.title}`}
            color="primary"
            variant="outlined"
            sx={{ fontSize: { xs: "0.75rem", md: "0.9rem" } }}
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
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              At Softnics Media, we help brands stand out with strategic creative, marketing, and technology
              services. Our goal is to deliver impactful results that help businesses grow and achieve digital
              excellence.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                color: "primary.main",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              What we do in {service.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              {service.intro}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 1,
                mt: 2,
                fontSize: { xs: "1rem", md: "1.15rem" },
              }}
            >
              Key Offerings:
            </Typography>

            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              {service.offerings.map((item) => (
                <Bullet key={item}>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                    }}
                  >
                    {item}
                  </Typography>
                </Bullet>
              ))}
            </Box>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              {service.closing}
            </Typography>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
       {/* CTA Buttons */}
<Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={2}
  justifyContent="center"
  alignItems="center"
  sx={{ mt: 4 }}
>
  {/* Primary Button */}
  <Button
    variant="contained"
    size="large"
    component={RouterLink}
    to="/#contact"
    sx={{
      borderRadius: 10,
      px: { xs: 3, sm: 4 },   // smaller padding
      py: 1.1,
      fontWeight: 600,
      width: { xs: "100%", sm: "auto" }, // full width ONLY on mobile
      maxWidth: 260, // ⭐ limit button width
      background: "linear-gradient(90deg, #2563eb, #3b82f6)",
      boxShadow: "0 6px 18px rgba(37, 99, 235, 0.35)",
      textTransform: "none",
    }}
  >
    Discuss this service
  </Button>

  {/* Secondary Button */}
  <Button
    variant="outlined"
    size="large"
    onClick={handleBackToServices}
    sx={{
      borderRadius: 10,
      px: { xs: 3, sm: 4 },
      py: 1.1,
      fontWeight: 600,
      width: { xs: "100%", sm: "auto" },
      maxWidth: 260, // ⭐ limit width
      textTransform: "none",
    }}
  >
    Explore all services
  </Button>
</Stack>

      </Container>
    </Box>
  );
};

export default ServiceDetailPage;

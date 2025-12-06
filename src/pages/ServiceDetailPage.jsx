// src/pages/ServiceDetailPage.jsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { services } from "../data/services";
import SectionWrapper from "../components/common/SectionWrapper";
import { styled } from "@mui/material/styles";

const Bullet = styled("li")(({ theme }) => ({
  marginBottom: theme.spacing(0.75),
}));

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <SectionWrapper id="service-not-found" title="Service Not Found">
        <Typography variant="body1" sx={{ mb: 2 }}>
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
      </SectionWrapper>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/"
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          {service.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Our Creative &amp; Digital Services • {service.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          At our agency, we provide complete creative, digital, and technology
          solutions designed to help brands grow, stand out, and succeed. From
          eye-catching design to powerful marketing and professional production
          services — we deliver everything your business needs under one roof.
        </Typography>

        <Chip
          label="Key Service Area"
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Typography variant="h6" sx={{ mt: 1, mb: 1.5 }}>
          What we do in {service.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {service.intro}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Our key offerings:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {service.offerings.map((item) => (
            <Bullet key={item}>
              <Typography variant="body2">{item}</Typography>
            </Bullet>
          ))}
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {service.closing}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/#contact"
            sx={{ scrollBehavior: "smooth" }}
          >
            Discuss this service
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/"
          >
            Explore all services
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;

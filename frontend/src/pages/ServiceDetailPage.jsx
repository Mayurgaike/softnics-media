import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Breadcrumbs,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchService } from "../api/api";
import { styled } from "@mui/material/styles";
import SEO from "../components/seo/SEO";

const Bullet = styled("li")(({ theme }) => ({
  marginBottom: theme.spacing(1.2),
}));

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Fetch published service by slug
  useEffect(() => {
    setLoading(true);
    fetchService(slug)
      .then((data) => {
        setService(data);
      })
      .catch(() => {
        setService(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <>
        <SEO
          title="Service Not Found | Softnics Media"
          description="The requested service does not exist or has been relocated."
          noIndex={true}
        />
        <Container maxWidth="md" sx={{ py: 12, textAlign: "center", minHeight: "60vh" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: "text.primary" }}>
            Service Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            The service you are looking for does not exist, is in draft mode, or has been moved.
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
      </>
    );
  }

  const handleBackToServices = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const canonicalUrl =
    service.canonicalUrl || `https://www.softnicsmedia.com/services/${service.slug}`;
  const effectiveTitle = service.metaTitle || `${service.title} | Softnics Media`;
  const effectiveDesc =
    service.metaDescription ||
    service.description ||
    service.intro ||
    `Professional ${service.title} services by Softnics Media. Delivering impactful digital and creative solutions.`;

  return (
    <>
      <SEO
        title={effectiveTitle}
        description={effectiveDesc}
        keywords={service.metaKeywords}
        canonical={canonicalUrl}
        ogTitle={service.ogTitle || effectiveTitle}
        ogDescription={service.ogDescription || effectiveDesc}
        ogImage={service.image || service.icon}
        twitterTitle={service.twitterTitle || effectiveTitle}
        twitterDescription={service.twitterDescription || effectiveDesc}
        twitterImage={service.image || service.icon}
        schemaCode={service.schemaCode}
        customHeaderCode={service.customHeaderCode}
      />

      <Box
        sx={{
          py: { xs: 5, md: 8 },
          background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          {/* Breadcrumb Navigation */}
          <Box sx={{ mb: 3 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Button
                component={RouterLink}
                to="/"
                sx={{ p: 0, minWidth: "auto", color: "#0046C7", fontWeight: 600, textTransform: "none" }}
              >
                Home
              </Button>
              <Typography
                sx={{
                  color: "#0046C7",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={handleBackToServices}
              >
                Services
              </Typography>
              <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
                {service.title}
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToServices}
            sx={{
              mb: 4,
              borderRadius: 3,
              px: 2.5,
              py: 0.8,
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              "&:hover": { background: "#f1f5f9" },
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Back to Services
          </Button>

          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                color: "primary.main",
                fontSize: { xs: "1.9rem", md: "2.5rem" },
              }}
            >
              {service.title}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2, fontSize: { xs: "0.95rem", md: "1.05rem" } }}
            >
              {service.description || "Elevating your brand with powerful digital & creative solutions."}
            </Typography>

            <Chip
              label={`Service: ${service.title}`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: { xs: "0.75rem", md: "0.85rem" } }}
            />
          </Box>

          {/* Primary Featured Image Banner (if uploaded) */}
          {service.image && (
            <Box
              component="img"
              src={service.image}
              alt={service.title}
              sx={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                mb: 4,
              }}
            />
          )}

          {/* Rich Text Body Content (New CMS WYSIWYG) */}
          {service.content && (
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 2.5, md: 4 },
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                mb: 4,
              }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                <Box
                  dangerouslySetInnerHTML={{ __html: service.content }}
                  sx={{
                    lineHeight: 1.8,
                    fontSize: "1.02rem",
                    color: "#334155",
                    "& h1, & h2, & h3, & h4": { color: "#0f172a", fontWeight: 700, mt: 3, mb: 1.5 },
                    "& p": { mb: 2 },
                    "& ul, & ol": { pl: 3.5, mb: 2.5 },
                    "& li": { mb: 0.8 },
                    "& img": { maxWidth: "100%", height: "auto", borderRadius: 2, my: 2 },
                    "& table": { width: "100%", borderCollapse: "collapse", my: 2 },
                    "& th, & td": { border: "1px solid #e2e8f0", p: 1.5 },
                    "& th": { bgcolor: "#f8fafc" },
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Structured Offerings & Intro (Complementary / Legacy Fallback) */}
          {(service.intro || (service.offerings && service.offerings.length > 0) || service.closing) && (
            <Card
              sx={{
                borderRadius: 4,
                p: { xs: 2.5, md: 4 },
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                mb: 4,
              }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                {!service.content && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      lineHeight: 1.7,
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      color: "text.primary",
                    }}
                  >
                    At Softnics Media, we help brands stand out with strategic
                    creative, marketing, and technology services. Our goal is to
                    deliver impactful results that help businesses grow and achieve
                    digital excellence.
                  </Typography>
                )}

                {service.intro && (
                  <>
                    <Typography
                      variant="h6"
                      component="h2"
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
                        fontSize: { xs: "0.95rem", md: "1rem" },
                      }}
                    >
                      {service.intro}
                    </Typography>
                  </>
                )}

                {service.offerings && service.offerings.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        mt: 2,
                        fontSize: { xs: "1rem", md: "1.15rem" },
                      }}
                    >
                      Key Offerings:
                    </Typography>

                    <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                      {service.offerings.map((item, idx) => (
                        <Bullet key={item.id || idx}>
                          <Typography
                            variant="body1"
                            sx={{
                              lineHeight: 1.6,
                              fontSize: { xs: "0.92rem", md: "1rem" },
                            }}
                          >
                            {typeof item === "object" ? item.text : item}
                          </Typography>
                        </Bullet>
                      ))}
                    </Box>
                  </>
                )}

                {service.closing && (
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      color: "text.secondary",
                    }}
                  >
                    {service.closing}
                  </Typography>
                )}
              </CardContent>
            </Card>
          )}

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/#contact"
              sx={{
                borderRadius: 10,
                px: { xs: 3, sm: 4 },
                py: 1.2,
                fontWeight: 600,
                width: { xs: "100%", sm: "auto" },
                maxWidth: 260,
                background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                boxShadow: "0 6px 18px rgba(37, 99, 235, 0.35)",
                textTransform: "none",
              }}
            >
              Discuss this service
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleBackToServices}
              sx={{
                borderRadius: 10,
                px: { xs: 3, sm: 4 },
                py: 1.2,
                fontWeight: 600,
                width: { xs: "100%", sm: "auto" },
                maxWidth: 260,
                textTransform: "none",
              }}
            >
              Explore all services
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ServiceDetailPage;

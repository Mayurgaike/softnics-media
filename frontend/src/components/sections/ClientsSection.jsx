import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import Slider from "react-slick";
import SectionWrapper from "../common/SectionWrapper";
import { fetchClients } from "../../api/api";

const ClientsSection = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients().then(setClients);
  }, []);
  useEffect(() => {
    console.log("Clients state updated:", clients);
  }, [clients]);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const slidesToShow = isXs ? 2 : isSm ? 3 : isMd ? 4 : 5;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    slidesToScroll: 1,
    slidesToShow,
    arrows: false,
  };

  const linkMap = selectedClient?.links?.reduce((acc, link) => {
    acc[link.platform] = link.url;
    return acc;
  }, {});

  return (
    <SectionWrapper
      id="clients"
      title="Our Clients"
      subtitle="Brands that trust us with their digital growth."
      bg="white"
    >
      <Box
        sx={{
          px: { xs: 1, md: 4 },
          py: { xs: 2, md: 4 },
          overflow: "hidden",

          "& .slick-track": {
            display: "flex",
            alignItems: "center",
          },
          "& .slick-slide": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Slider {...settings}>
          {clients.map((client) => (
            <Box
              key={client.id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                onClick={() => setSelectedClient(client)}
                sx={{
                  cursor: "pointer",
                  height: { xs: 110, md: 160 },
                  width: { xs: 110, md: 160 },
                  borderRadius: 3,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(0,80,200,0.18)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={client.logo}
                  alt={client.name}
                  sx={{
                    maxWidth: client.logoWidth,
                    maxHeight: client.logoHeight,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <Dialog
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedClient && (
          <>
            <DialogTitle sx={{ display: "flex", alignItems: "center", pr: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={selectedClient.logo}
                  alt={selectedClient.name}
                  sx={{ height: 50, objectFit: "contain" }}
                />
                <Typography variant="h6">{selectedClient.name}</Typography>
              </Box>

              <IconButton
                onClick={() => setSelectedClient(null)}
                sx={{ position: "absolute", right: 12, top: 12 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {selectedClient.shortSummary}
              </Typography>

              <ul style={{ paddingLeft: "1.2rem", marginTop: 0 }}>
                {selectedClient.details.map((detail) => (
                  <li key={detail.id}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {detail.text}
                    </Typography>
                  </li>
                ))}
              </ul>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {linkMap?.youtube && (
                  <IconButton
                    href={linkMap.youtube}
                    target="_blank"
                    sx={{ color: "#FF0000" }}
                  >
                    <YouTubeIcon fontSize="large" />
                  </IconButton>
                )}

                {linkMap?.instagram && (
                  <IconButton
                    href={linkMap.instagram}
                    target="_blank"
                    sx={{ color: "#E1306C" }}
                  >
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                )}

                {linkMap?.facebook && (
                  <IconButton
                    href={linkMap.facebook}
                    target="_blank"
                    sx={{ color: "#1877F2" }}
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

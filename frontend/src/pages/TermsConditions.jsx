import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  // ⭐ Ensure page opens from TOP
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* MAIN HEADING */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 3,
          textAlign: "center",
          color: "#0B1A39",
        }}
      >
        Terms & Conditions – Softnics Media
      </Typography>

      <Typography
        sx={{
          mb: 4,
          textAlign: "center",
          color: "#444",
          fontSize: "1.05rem",
        }}
      >
        Please read these terms carefully. By working with Softnics Media, you
        agree to the following service policies.
      </Typography>

      <Box sx={{ lineHeight: 1.8 }}>

        {/* Intellectual Property */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Intellectual Property
        </Typography>

        <Typography sx={{ mt: 1 }}>
          All materials, designs, content, and media created or provided by
          Softnics Media are protected under copyright and intellectual
          property laws.
        </Typography>

        <Typography sx={{ mb: 1 }}>
          You may not modify, publish, distribute, or commercially reuse any
          content without written permission.  
          Softnics Media does not sell or share your content with third parties
          unless required to provide services.
        </Typography>

        {/* Content Responsibility */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Content Responsibility
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Clients must provide accurate, original, non-copyrighted images,
          text, and branding materials.  
          Softnics Media is not responsible for legal disputes caused by
          client-submitted assets.
        </Typography>

        {/* Portfolio Usage */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Portfolio & Promotion
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Softnics Media may showcase completed projects in its portfolio,
          website, presentations, and marketing content unless explicitly
          requested otherwise in writing by the client.
        </Typography>

        {/* Payment Terms */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Payment Terms
        </Typography>

        <Typography component="ul" sx={{ pl: 4 }}>
          <li>Website Development: 50% advance + 50% after approval/going live</li>
          <li>All Other Services: 100% advance</li>
          <li>Ad Budget: Must be paid directly to Google/Meta platforms</li>
        </Typography>

        {/* Engagement Period */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Engagement Period
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Minimum commitment period for Digital Marketing & SEO services is{" "}
          <strong>6 months</strong>.
        </Typography>

        {/* Cancellation */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Cancellation Policy
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Clients must email our support team to request cancellation:
          <br />
          📩 <strong>softnicsmedia@gmail.com</strong>
        </Typography>

        {/* Refund Policy */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}
        >
          Refund Policy
        </Typography>

        <Typography sx={{ mb: 3 }}>
          All payments are non-refundable.  
          We provide detailed consultation & portfolio examples before project
          confirmation. Please clarify all doubts prior to payment.
        </Typography>

        <Typography
          sx={{
            mt: 3,
            fontWeight: 600,
            textAlign: "center",
            color: "#0B1A39",
          }}
        >
          Thank you for choosing Softnics Media!
        </Typography>
      </Box>

      {/* BACK BUTTON */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          component={Link}
          to="/"
          sx={{
            background: "linear-gradient(90deg,#0046C7,#007BFF)",
            color: "white",
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg,#003BB0,#006BE3)",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default TermsConditions;

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Policy = () => {

  // ⭐ FIX: Always open page from TOP
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
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 3,
          textAlign: "center",
          color: "#0B1A39",
        }}
      >
        Privacy Policy – Softnics Media
      </Typography>

      <Typography
        sx={{
          mb: 4,
          textAlign: "center",
          color: "#444",
          fontSize: "1.05rem",
        }}
      >
        Your privacy is important to us. This page explains what data we collect,
        how we use it, and how we keep it secure.
      </Typography>

      {/* ===================== CONTENT ===================== */}
      <Box sx={{ lineHeight: 1.8 }}>
        {/* 1 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          1. Information We Collect
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: 600 }}>a. Personal Information</Typography>
        <Typography>
          Name <br />
          Email address <br />
          Phone number <br />
          Company name <br />
          Billing and payment details
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: 600 }}>b. Non-Personal Information</Typography>
        <Typography>
          Browser type <br />
          IP address <br />
          Device type <br />
          Usage analytics <br />
          Cookies & tracking data
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: 600 }}>c. Project-Related Information</Typography>
        <Typography>
          Any content, images, or reference material you share for your project.
        </Typography>

        {/* 2 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          2. How We Use Your Information
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Softnics Media uses your information to:
        </Typography>

        <Typography component="ul" sx={{ pl: 4 }}>
          <li>Deliver and manage digital marketing & development services</li>
          <li>Communicate regarding project updates</li>
          <li>Process billing and invoices</li>
          <li>Improve our website and services</li>
          <li>Send offers (only if you agree)</li>
        </Typography>

        <Typography sx={{ mt: 1 }}>
          We <strong>never sell</strong> your information to third parties.
        </Typography>

        {/* 3 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          3. Sharing of Information
        </Typography>

        <Typography>We may share your information only:</Typography>

        <Typography component="ul" sx={{ pl: 4 }}>
          <li>With trusted service partners</li>
          <li>With payment systems</li>
          <li>To comply with legal obligations</li>
        </Typography>

        {/* 4 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          4. Data Security
        </Typography>
        <Typography>
          Your data is stored securely using encryption and industry best
          practices. However, no online system is 100% risk-free.
        </Typography>

        {/* 5 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          5. Cookies & Tracking
        </Typography>
        <Typography>
          Softnics Media uses cookies to analyze usage and improve performance.
        </Typography>

        {/* 6 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          6. Third-Party Links
        </Typography>
        <Typography>
          We are not responsible for external websites linked from our platform.
        </Typography>

        {/* 7 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          7. Data Retention
        </Typography>
        <Typography>
          We retain your data only for legal compliance and project history.
        </Typography>

        {/* 8 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          8. Your Rights
        </Typography>

        <Typography component="ul" sx={{ pl: 4 }}>
          <li>Request a copy of your data</li>
          <li>Update or correct details</li>
          <li>Request deletion (where legally allowed)</li>
          <li>Opt out of promotional messages</li>
        </Typography>

        {/* 9 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          9. Updates to This Policy
        </Typography>
        <Typography>
          We may update this page occasionally. Any changes will appear here.
        </Typography>

        {/* 10 */}
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 4, color: "#0046C7" }}>
          10. Contact Information
        </Typography>

        <Typography sx={{ mb: 4 }}>
          For concerns or questions:  
          📩 <strong>softnicsmedia@gmail.com</strong>
        </Typography>
      </Box>

      {/* BACK TO HOME BUTTON */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
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

export default Policy;

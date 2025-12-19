// src/pages/TermsConditions.jsx
import { Box, Typography } from "@mui/material";

const TermsConditions = () => {
  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", py: 6, px: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Terms & Conditions – Softnics Media
      </Typography>

      {/* Intellectual Property */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Intellectual Property
      </Typography>

      <Typography sx={{ mb: 1 }}>
        All information, material, and content provided by Softnics Media are
        protected by copyright and intellectual property laws. You may not modify,
        publish, distribute, re-post, perform, display, or commercially exploit any
        content without written permission.
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Softnics Media does not sell, rent, or share your information with any
        third party except when necessary to fulfill a service or requirement.
      </Typography>

      {/* Content Responsibility */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Content Responsibility
      </Typography>

      <Typography sx={{ mb: 1 }}>
        All content, images, and materials required for the project must be provided 
        by the client. Softnics Media is not responsible for any copyright, trademark,
        or intellectual property issues arising from client-provided assets.
      </Typography>

      {/* Portfolio Usage */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Portfolio & Promotion
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Work developed by Softnics Media may include a credit or link to our website.
        Client brand names may be used in case studies, marketing material, and
        promotional content unless otherwise agreed in writing.
      </Typography>

      {/* Payment Terms */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Payment Terms
      </Typography>

      <Typography component="ul" sx={{ pl: 3, mb: 1 }}>
        <li>Website Development: 50% advance + 50% after final approval or going live</li>
        <li>All Other Services: 100% advance payment</li>
        <li>Advertising Budget: Ad spend (Google/Meta Ads) must be paid directly to the platform</li>
      </Typography>

      {/* Engagement Period */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Engagement Period
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Minimum engagement period for Digital Marketing & SEO services is <strong>6 months</strong>.
      </Typography>

      {/* Cancellation */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Cancellation Policy
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Clients must notify our support team via email for service cancellation:
        <br />
        📩 <strong>softnicsmedia@gmail.com</strong>
      </Typography>

      {/* Refund */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        Refund Policy
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Softnics Media provides a detailed portfolio and consultations before onboarding.
        Payments for services are non-refundable. Please clarify any doubts before payment.
      </Typography>

      <Typography sx={{ mt: 4, fontWeight: 600 }}>
        Thank you for choosing Softnics Media!
      </Typography>
    </Box>
  );
};

export default TermsConditions;

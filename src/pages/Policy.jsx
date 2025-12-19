
import { Box, Typography } from "@mui/material";

const Policy = () => {
  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", py: 6, px: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Privacy Policy – Softnics Media
      </Typography>

      <Typography sx={{ mb: 2 }}>
        At Softnics Media, we are committed to protecting your privacy and
        ensuring that your personal information is handled in a safe and
        responsible manner. This Privacy Policy outlines how we collect, use,
        store, and safeguard your information.
      </Typography>

      {/* 1. Information We Collect */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        1. Information We Collect
      </Typography>

      <Typography sx={{ mt: 1, fontWeight: 600 }}>a. Personal Information</Typography>
      <Typography sx={{ mb: 1 }}>
        Name <br />
        Email address <br />
        Phone number <br />
        Company name <br />
        Billing and payment details
      </Typography>

      <Typography sx={{ mt: 1, fontWeight: 600 }}>b. Non-Personal Information</Typography>
      <Typography sx={{ mb: 1 }}>
        Browser type <br />
        IP address <br />
        Device type <br />
        Website usage data <br />
        Cookies and tracking information
      </Typography>

      <Typography sx={{ mt: 1, fontWeight: 600 }}>c. Project-Related Information</Typography>
      <Typography sx={{ mb: 1 }}>
        Any content, images, text, or material you provide for your project.
      </Typography>

      {/* 2. How We Use Your Information */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        2. How We Use Your Information
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Softnics Media uses your information to:
      </Typography>

      <Typography component="ul" sx={{ pl: 3, mb: 1 }}>
        <li>Provide and manage our digital marketing, design, and development services</li>
        <li>Communicate regarding projects, support, and updates</li>
        <li>Process payments and invoices</li>
        <li>Improve service quality and user experience</li>
        <li>Send offers or promotional communications (if consented)</li>
      </Typography>

      <Typography sx={{ mb: 1 }}>
        We do <strong>not</strong> sell or rent your personal information to third parties.
      </Typography>

      {/* 3. Sharing Information */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        3. Sharing of Information
      </Typography>

      <Typography sx={{ mb: 1 }}>
        We may share your information only when necessary:
      </Typography>

      <Typography component="ul" sx={{ pl: 3, mb: 1 }}>
        <li>With trusted service providers essential for completing your project</li>
        <li>With payment processors for billing</li>
        <li>To comply with legal obligations or protect our rights</li>
      </Typography>

      {/* 4. Data Security */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        4. Data Security
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Your data is protected through secure servers, encryption, and 
        industry-standard security practices.  
        However, no online system can guarantee 100% security.
      </Typography>

      {/* 5. Cookies */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        5. Cookies & Tracking
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Softnics Media uses cookies to enhance user experience, track analytics,
        and improve site performance. You may disable cookies in your browser settings.
      </Typography>

      {/* 6. Third-Party Links */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        6. Third-Party Links
      </Typography>

      <Typography sx={{ mb: 1 }}>
        Our website may contain links to external sites. We are not responsible
        for their privacy practices or content.
      </Typography>

      {/* 7. Data Retention */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        7. Data Retention
      </Typography>

      <Typography sx={{ mb: 1 }}>
        We retain data only as long as required for projects, legal obligations,
        and service history.
      </Typography>

      {/* 8. Your Rights */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        8. Your Rights
      </Typography>

      <Typography component="ul" sx={{ pl: 3, mb: 1 }}>
        <li>Request access to your data</li>
        <li>Request corrections or updates</li>
        <li>Request deletion (when allowed legally)</li>
        <li>Opt out of marketing emails anytime</li>
      </Typography>

      {/* 9. Updates */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        9. Updates to This Policy
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Softnics Media may update this policy occasionally. Changes will be posted
        with a revised version date.
      </Typography>

      {/* 10. Contact */}
      <Typography variant="h6" sx={{ fontWeight: 700, mt: 3 }}>
        10. Contact Information
      </Typography>

      <Typography sx={{ mb: 3 }}>
        For privacy-related concerns, please contact us:  
        📩 <strong>softnicsmedia@gmail.com</strong>
      </Typography>
    </Box>
  );
};

export default Policy;

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Stack,
  Box,
  Alert,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";

const SEOFieldsAccordion = ({
  values,
  onChange,
  canonicalPlaceholder = "https://www.softnicsmedia.com/...",
}) => {
  const [schemaError, setSchemaError] = useState("");

  const handleChange = (field) => (e) => {
    onChange(field, e.target.value);
  };

  const handleSchemaChange = (e) => {
    const val = e.target.value;
    onChange("schemaCode", val);

    if (!val.trim()) {
      setSchemaError("");
      return;
    }

    try {
      // Validate whether it's JSON or script tag with JSON
      let jsonText = val.trim();
      if (jsonText.startsWith("<script") && jsonText.endsWith("</script>")) {
        jsonText = jsonText.replace(/<script[^>]*>/, "").replace(/<\/script>/, "");
      }
      JSON.parse(jsonText);
      setSchemaError("");
    } catch (err) {
      setSchemaError("Notice: Structured data is not valid JSON.");
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
      {/* 1. SEO & Social Metadata Accordion */}
      <Accordion
        defaultExpanded={false}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px !important",
          boxShadow: "none",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SearchIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              Search Engine Optimization (SEO) & Social Sharing
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={2.5}>
            <TextField
              label="Meta Title"
              value={values.metaTitle || ""}
              onChange={handleChange("metaTitle")}
              placeholder="Primary headline for Google search results (recommended: 50-60 characters)"
              helperText={`${(values.metaTitle || "").length} / 60 characters`}
              fullWidth
              size="small"
            />

            <TextField
              label="Meta Description"
              value={values.metaDescription || ""}
              onChange={handleChange("metaDescription")}
              placeholder="Brief summary appearing in search engine snippets (recommended: 140-160 characters)"
              helperText={`${(values.metaDescription || "").length} / 160 characters`}
              multiline
              rows={2}
              fullWidth
              size="small"
            />

            <TextField
              label="Meta Keywords"
              value={values.metaKeywords || ""}
              onChange={handleChange("metaKeywords")}
              placeholder="e.g. digital marketing, web design, SEO agency (comma separated)"
              fullWidth
              size="small"
            />

            <TextField
              label="Canonical URL"
              value={values.canonicalUrl || ""}
              onChange={handleChange("canonicalUrl")}
              placeholder={canonicalPlaceholder}
              helperText="Specifies the preferred URL for search engines to prevent duplicate content indexing."
              fullWidth
              size="small"
            />

            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Open Graph (Facebook, LinkedIn, WhatsApp)
              </Typography>
            </Divider>

            <TextField
              label="OG Title"
              value={values.ogTitle || ""}
              onChange={handleChange("ogTitle")}
              placeholder="Title displayed when shared on social networks"
              fullWidth
              size="small"
            />

            <TextField
              label="OG Description"
              value={values.ogDescription || ""}
              onChange={handleChange("ogDescription")}
              placeholder="Description displayed on social shares"
              multiline
              rows={2}
              fullWidth
              size="small"
            />

            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Twitter / X Card
              </Typography>
            </Divider>

            <TextField
              label="Twitter Title"
              value={values.twitterTitle || ""}
              onChange={handleChange("twitterTitle")}
              placeholder="Headline for Twitter cards"
              fullWidth
              size="small"
            />

            <TextField
              label="Twitter Description"
              value={values.twitterDescription || ""}
              onChange={handleChange("twitterDescription")}
              placeholder="Summary for Twitter cards"
              multiline
              rows={2}
              fullWidth
              size="small"
            />

            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Structured Data (JSON-LD Schema)
              </Typography>
            </Divider>

            <TextField
              label="Schema Code (JSON-LD)"
              value={values.schemaCode || ""}
              onChange={handleSchemaChange}
              placeholder='{"@context": "https://schema.org", "@type": "Service", ...}'
              multiline
              rows={4}
              error={!!schemaError}
              helperText={schemaError || "Paste valid JSON-LD schema or script markup."}
              fullWidth
              size="small"
              sx={{ fontFamily: "monospace" }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* 2. Custom Header Code Accordion (Separated as required) */}
      <Accordion
        defaultExpanded={false}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px !important",
          boxShadow: "none",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CodeIcon color="action" fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              Custom Header Code (Optional Head Markup)
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={2}>
            <Alert severity="info" sx={{ fontSize: "0.85rem" }}>
              <strong>Security Policy:</strong> For site safety, only validated &lt;meta&gt;, &lt;link&gt;, and &lt;script type="application/ld+json"&gt; tags are permitted. Executable JavaScript and unsafe event handlers are strictly sanitized and stripped by the server.
            </Alert>

            <TextField
              label="Custom Header Code"
              value={values.customHeaderCode || ""}
              onChange={handleChange("customHeaderCode")}
              placeholder='<meta name="custom-verification" content="..." />'
              multiline
              rows={4}
              fullWidth
              size="small"
              sx={{ fontFamily: "monospace" }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default SEOFieldsAccordion;


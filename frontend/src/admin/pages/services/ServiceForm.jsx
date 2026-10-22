import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import { createService, updateService } from "../../../api/api";
import RichTextEditor from "../../components/RichTextEditor";
import SEOFieldsAccordion from "../../components/SEOFieldsAccordion";
import ContentPreviewDialog from "../../components/ContentPreviewDialog";

const formatSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const ServiceForm = ({ service, onClose, onSaved }) => {
  const isEdit = !!service?.id;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    description: "",
    intro: "",
    closing: "",
    offerings: [],
    status: "published",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: "",
    schemaCode: "",
    canonicalUrl: "",
    customHeaderCode: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newOffering, setNewOffering] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title || "",
        slug: service.slug || "",
        content: service.content || "",
        description: service.description || "",
        intro: service.intro || "",
        closing: service.closing || "",
        offerings: service.offerings?.map((o) => (typeof o === "object" ? o.text : o)) || [],
        status: service.status || "published",
        metaTitle: service.metaTitle || "",
        metaDescription: service.metaDescription || "",
        metaKeywords: service.metaKeywords || "",
        ogTitle: service.ogTitle || "",
        ogDescription: service.ogDescription || "",
        twitterTitle: service.twitterTitle || "",
        twitterDescription: service.twitterDescription || "",
        schemaCode: service.schemaCode || "",
        canonicalUrl: service.canonicalUrl || "",
        customHeaderCode: service.customHeaderCode || "",
      });
      setImagePreview(service.image || service.icon || null);
    }
  }, [service]);

  const handleTextChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
      // Auto-suggest slug if editing title and slug was untouched
      if (field === "title" && !isEdit && !prev.slugManuallyEdited) {
        updated.slug = formatSlug(val);
      }
      return updated;
    });
  };

  const handleSlugChange = (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      slug: formatSlug(val),
      slugManuallyEdited: true,
    }));
  };

  const handleAutoSlug = () => {
    if (form.title) {
      setForm((prev) => ({
        ...prev,
        slug: formatSlug(prev.title),
        slugManuallyEdited: true,
      }));
    }
  };

  const handleSEOChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File size exceeds 5MB limit.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const handleAddOffering = () => {
    if (newOffering.trim()) {
      setForm((prev) => ({
        ...prev,
        offerings: [...prev.offerings, newOffering.trim()],
      }));
      setNewOffering("");
    }
  };

  const handleRemoveOffering = (index) => {
    setForm((prev) => ({
      ...prev,
      offerings: prev.offerings.filter((_, i) => i !== index),
    }));
  };

  const submit = async (targetStatus) => {
    if (!form.title.trim()) {
      setErrorMsg("Page Title is required.");
      return;
    }

    if (!form.slug.trim()) {
      setErrorMsg("Page Slug is required.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("slug", form.slug.trim());
      fd.append("content", form.content || "");
      fd.append("description", form.description || "");
      fd.append("intro", form.intro || "");
      fd.append("closing", form.closing || "");
      fd.append("status", targetStatus || form.status);
      fd.append("offerings", JSON.stringify(form.offerings));

      // SEO fields
      fd.append("metaTitle", form.metaTitle || "");
      fd.append("metaDescription", form.metaDescription || "");
      fd.append("metaKeywords", form.metaKeywords || "");
      fd.append("ogTitle", form.ogTitle || "");
      fd.append("ogDescription", form.ogDescription || "");
      fd.append("twitterTitle", form.twitterTitle || "");
      fd.append("twitterDescription", form.twitterDescription || "");
      fd.append("schemaCode", form.schemaCode || "");
      fd.append("canonicalUrl", form.canonicalUrl || "");
      fd.append("customHeaderCode", form.customHeaderCode || "");

      if (imageFile) {
        fd.append("image", imageFile);
      }

      if (isEdit) {
        await updateService(service.id, fd);
      } else {
        await createService(fd);
      }

      onSaved();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save service. Check unique slug or fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 1 }}>
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Status indicator */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Current Status:</Typography>
            <Chip
              label={(form.status || "draft").toUpperCase()}
              color={form.status === "published" ? "success" : "default"}
              size="small"
            />
          </Box>
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            size="small"
            onClick={() => setOpenPreview(true)}
          >
            Live Preview
          </Button>
        </Box>

        {/* Title */}
        <TextField
          label="Page Title *"
          value={form.title}
          onChange={handleTextChange("title")}
          placeholder="e.g. Digital Marketing & Growth Solutions"
          fullWidth
          required
        />

        {/* Slug */}
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="URL Slug *"
              value={form.slug}
              onChange={handleSlugChange}
              placeholder="e.g. digital-marketing-growth"
              fullWidth
              required
              helperText={`Final URL: https://www.softnicsmedia.com/services/${form.slug || "your-slug"}`}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={handleAutoSlug}
              startIcon={<AutoFixHighIcon />}
              sx={{ minWidth: 140, height: 40 }}
            >
              From Title
            </Button>
          </Stack>
        </Box>

        {/* Primary Image Upload */}
        <Box
          sx={{
            p: 2.5,
            border: "1px dashed #cbd5e1",
            borderRadius: 2,
            bgcolor: "#f8fafc",
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Primary Service Image
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
            Accepted formats: JPG, PNG, WEBP, SVG. Maximum file size: 5MB.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              size="small"
            >
              Choose Image
              <input
                hidden
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleImageChange}
              />
            </Button>

            {imagePreview && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    width: 70,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Stack>
        </Box>

        {/* WYSIWYG Rich Text Editor */}
        <RichTextEditor
          label="Service Body Content (WYSIWYG Rich Text)"
          value={form.content}
          onChange={(newContent) => setForm((prev) => ({ ...prev, content: newContent }))}
          placeholder="Compose detailed service description, methodology, deliverables, and case highlights..."
          height={400}
        />

        {/* Legacy Structured Fields (Intro, Offerings, Closing) Accordion */}
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
              <ListAltIcon color="action" fontSize="small" />
              <Typography variant="subtitle1" fontWeight={700}>
                Key Offerings & Overview Summary (Structured)
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2.5}>
              <TextField
                label="Short Description"
                value={form.description}
                onChange={handleTextChange("description")}
                placeholder="Brief summary card description"
                multiline
                rows={2}
                fullWidth
              />

              <TextField
                label="Intro Text"
                value={form.intro}
                onChange={handleTextChange("intro")}
                placeholder="Introductory paragraph displayed on the service page"
                multiline
                rows={2}
                fullWidth
              />

              {/* Offerings list */}
              <Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Bullet Offerings:
                </Typography>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {form.offerings.map((offering, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        bgcolor: "#f1f5f9",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        • {offering}
                      </Typography>
                      <IconButton size="small" color="error" onClick={() => handleRemoveOffering(idx)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>

                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    placeholder="Add bullet point offering..."
                    value={newOffering}
                    onChange={(e) => setNewOffering(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddOffering();
                      }
                    }}
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddOffering}
                  >
                    Add
                  </Button>
                </Stack>
              </Box>

              <TextField
                label="Closing Text"
                value={form.closing}
                onChange={handleTextChange("closing")}
                placeholder="Closing concluding statement"
                multiline
                rows={2}
                fullWidth
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* SEO & Custom Header Code */}
        <SEOFieldsAccordion
          values={form}
          onChange={handleSEOChange}
          canonicalPlaceholder={`https://www.softnicsmedia.com/services/${form.slug || "slug"}`}
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2, borderTop: "1px solid #e2e8f0" }}>
          <Button onClick={onClose} disabled={loading} color="inherit">
            Cancel
          </Button>

          <Button
            variant="outlined"
            onClick={() => submit("draft")}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Draft"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => submit("published")}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Publish Service"}
          </Button>
        </Stack>
      </Stack>

      {/* Content Preview Dialog */}
      <ContentPreviewDialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        type="Service"
        data={{
          title: form.title,
          slug: form.slug,
          content: form.content,
          imagePreview: imagePreview,
          status: form.status,
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          ogTitle: form.ogTitle,
          ogDescription: form.ogDescription,
        }}
      />
    </Box>
  );
};

export default ServiceForm;

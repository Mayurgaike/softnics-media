import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import { createBlog, updateBlog } from "../../../api/api";
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

// Converts legacy contentBlocks array to initial HTML string if blog.content is empty
const blocksToHtml = (blocks) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  return blocks
    .map((b) => {
      if (b.type === "heading") return `<h2>${b.text || ""}</h2>`;
      if (b.type === "subheading") return `<h3>${b.text || ""}</h3>`;
      if (b.type === "paragraph") return `<p>${b.text || ""}</p>`;
      if (b.type === "list") {
        const items = Array.isArray(b.items)
          ? b.items
          : typeof b.items === "string"
            ? JSON.parse(b.items || "[]")
            : [];
        return `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
      }
      return "";
    })
    .join("\n");
};

const BlogForm = ({ blog, onSubmit, onSaved }) => {
  const isEdit = !!blog?.id;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    shortDesc: "",
    author: "Softnics Media Team",
    date: "",
    publishedAt: "",
    readTime: "5 min read",
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    if (blog) {
      let initialContent = blog.content;
      if (!initialContent && blog.contentBlocks) {
        initialContent = blocksToHtml(blog.contentBlocks);
      }

      setForm({
        title: blog.title || "",
        slug: blog.slug || "",
        content: initialContent || "",
        shortDesc: blog.shortDesc || "",
        author: blog.author || "Softnics Media Team",
        date: blog.date || "",
        publishedAt: blog.publishedAt ? blog.publishedAt.slice(0, 10) : "",
        readTime: blog.readTime || "5 min read",
        status: blog.status || "published",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        metaKeywords: blog.metaKeywords || "",
        ogTitle: blog.ogTitle || "",
        ogDescription: blog.ogDescription || "",
        twitterTitle: blog.twitterTitle || "",
        twitterDescription: blog.twitterDescription || "",
        schemaCode: blog.schemaCode || "",
        canonicalUrl: blog.canonicalUrl || "",
        customHeaderCode: blog.customHeaderCode || "",
      });
      setImagePreview(blog.image || null);
    }
  }, [blog]);

  const handleTextChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [field]: val };
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

  const submit = async (targetStatus) => {
    if (!form.title.trim()) {
      setErrorMsg("Blog Title is required.");
      return;
    }

    if (!form.slug.trim()) {
      setErrorMsg("Blog Slug is required.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("slug", form.slug.trim());
      fd.append("content", form.content || "");
      fd.append("shortDesc", form.shortDesc || "");
      fd.append("author", form.author || "Softnics Media Team");
      fd.append("readTime", form.readTime || "5 min read");
      fd.append("date", form.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }));
      if (form.publishedAt) {
        fd.append("publishedAt", form.publishedAt);
      }
      fd.append("status", targetStatus || form.status);

      // SEO
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
        await updateBlog(blog.id, fd);
      } else {
        await createBlog(fd);
      }

      if (onSaved) onSaved();
      else if (onSubmit) onSubmit();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save blog. Check unique slug or fields.");
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
        {/* Status indicator & preview button */}
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
          label="Blog Title *"
          value={form.title}
          onChange={handleTextChange("title")}
          placeholder="e.g. How AI Is Transforming Digital Marketing in 2025"
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
              placeholder="e.g. ai-transforming-digital-marketing-2025"
              fullWidth
              required
              helperText={`Final URL: https://www.softnicsmedia.com/blog/${form.slug || "your-slug"}`}
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

        {/* Author, Date, Read Time */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Author"
            value={form.author}
            onChange={handleTextChange("author")}
            placeholder="Author name"
            fullWidth
            size="small"
          />

          <TextField
            label="Publication Date"
            type="date"
            value={form.publishedAt}
            onChange={handleTextChange("publishedAt")}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Read Time"
            value={form.readTime}
            onChange={handleTextChange("readTime")}
            placeholder="e.g. 6 min read"
            fullWidth
            size="small"
          />
        </Stack>

        {/* Short Description */}
        <TextField
          label="Short Description / Excerpt"
          value={form.shortDesc}
          onChange={handleTextChange("shortDesc")}
          placeholder="Brief summary appearing on blog listing cards..."
          multiline
          rows={3}
          fullWidth
        />

        {/* Featured Image */}
        <Box
          sx={{
            p: 2.5,
            border: "1px dashed #cbd5e1",
            borderRadius: 2,
            bgcolor: "#f8fafc",
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Featured Blog Image
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
              Upload Cover Image
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
          label="Blog Content (WYSIWYG Rich Text)"
          value={form.content}
          onChange={(newContent) => setForm((prev) => ({ ...prev, content: newContent }))}
          placeholder="Write the full blog article with headings, quotes, lists, images, and links..."
          height={450}
        />

        {/* SEO & Custom Header Code */}
        <SEOFieldsAccordion
          values={form}
          onChange={handleSEOChange}
          canonicalPlaceholder={`https://www.softnicsmedia.com/blog/${form.slug || "slug"}`}
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2, borderTop: "1px solid #e2e8f0" }}>
          <Button onClick={onSubmit} disabled={loading} color="inherit">
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
            {loading ? <CircularProgress size={24} /> : "Publish Blog"}
          </Button>
        </Stack>
      </Stack>

      {/* Content Preview Dialog */}
      <ContentPreviewDialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        type="Blog"
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
          author: form.author,
          date: form.date,
        }}
      />
    </Box>
  );
};

export default BlogForm;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";

const ContentPreviewDialog = ({
  open,
  onClose,
  type = "Service", // "Service" or "Blog"
  data = {},
}) => {
  const [tab, setTab] = React.useState(0);

  const {
    title = "Untitled",
    slug = "",
    content = "",
    imagePreview = null,
    status = "draft",
    metaTitle = "",
    metaDescription = "",
    ogTitle = "",
    ogDescription = "",
    author = "",
    date = "",
  } = data;

  const previewUrl = `https://www.softnicsmedia.com/${type.toLowerCase() === "blog" ? "blog" : "services"}/${slug || "preview-slug"}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <VisibilityIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            {type} Content Preview
          </Typography>
        </Box>
        <Chip
          label={status.toUpperCase()}
          color={status === "published" ? "success" : "default"}
          size="small"
        />
      </DialogTitle>

      <Tabs
        value={tab}
        onChange={(_, val) => setTab(val)}
        sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}
      >
        <Tab label="Web Page View" />
        <Tab icon={<SearchIcon fontSize="small" />} iconPosition="start" label="Google Search Snippet" />
        <Tab icon={<ShareIcon fontSize="small" />} iconPosition="start" label="Social Share Card" />
      </Tabs>

      <DialogContent sx={{ minHeight: 380, py: 3 }}>
        {/* TAB 0: Web Page View */}
        {tab === 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
              URL: {previewUrl}
            </Typography>

            <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
              {title}
            </Typography>

            {type === "Blog" && (author || date) && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {author && `By ${author}`} {author && date && "•"} {date}
              </Typography>
            )}

            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt={title}
                sx={{
                  width: "100%",
                  maxHeight: 320,
                  objectFit: "cover",
                  borderRadius: "8px",
                  mb: 3,
                }}
              />
            )}

            <Divider sx={{ mb: 2 }} />

            {content ? (
              <Box
                dangerouslySetInnerHTML={{ __html: content }}
                sx={{
                  lineHeight: 1.8,
                  color: "#334155",
                  "& h1, & h2, & h3, & h4": { color: "#0f172a", mt: 2, mb: 1 },
                  "& p": { mb: 1.5 },
                  "& ul, & ol": { pl: 3, mb: 1.5 },
                  "& img": { maxWidth: "100%", borderRadius: "4px" },
                }}
              />
            ) : (
              <Typography color="text.secondary" fontStyle="italic">
                (No rich body content entered yet)
              </Typography>
            )}
          </Box>
        )}

        {/* TAB 1: Google Search Snippet */}
        {tab === 1 && (
          <Box sx={{ maxWidth: 600, py: 2 }}>
            <Paper elevation={0} sx={{ p: 2.5, border: "1px solid #e2e8f0", borderRadius: 2 }}>
              <Typography variant="caption" sx={{ color: "#202124", display: "block" }}>
                www.softnicsmedia.com › {type.toLowerCase() === "blog" ? "blog" : "services"} › {slug || "slug"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#1a0dab",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                  my: 0.5,
                }}
              >
                {metaTitle || title} | Softnics Media
              </Typography>
              <Typography variant="body2" sx={{ color: "#4d5156", lineHeight: 1.5 }}>
                {metaDescription || "No meta description provided. Search engines will automatically generate a snippet from your body text."}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* TAB 2: Social Share Card */}
        {tab === 2 && (
          <Box sx={{ maxWidth: 520, py: 2 }}>
            <Paper elevation={0} sx={{ border: "1px solid #cfd9de", borderRadius: 3, overflow: "hidden" }}>
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Social preview"
                  sx={{ width: "100%", height: 260, objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 180,
                    bgcolor: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  (No primary image uploaded)
                </Box>
              )}
              <Box sx={{ p: 2, bgcolor: "#f7f9f9" }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase" }}>
                  softnicsmedia.com
                </Typography>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#0f1419", my: 0.5 }}>
                  {ogTitle || metaTitle || title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {ogDescription || metaDescription || "Discover creative, digital, and technology solutions with Softnics Media."}
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentPreviewDialog;


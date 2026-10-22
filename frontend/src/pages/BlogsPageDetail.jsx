import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlog } from "../api/api";
import { Box, Typography, Breadcrumbs, CircularProgress, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import SEO from "../components/seo/SEO";

const BlogsPageDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    fetchBlog(slug)
      .then((data) => setBlog(data))
      .catch((err) => {
        console.error("Failed to load blog:", err);
        setBlog(null);
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

  if (!blog) {
    return (
      <>
        <SEO
          title="Blog Not Found | Softnics Media"
          description="The requested article does not exist or has been unpublished."
          noIndex={true}
        />
        <Container maxWidth="md" sx={{ py: 12, textAlign: "center", minHeight: "60vh" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: "text.primary" }}>
            Article Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            The blog post you are looking for does not exist, is in draft mode, or has been moved.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/blogs"
          >
            Back to All Blogs
          </Button>
        </Container>
      </>
    );
  }

  const canonicalUrl =
    blog.canonicalUrl || `https://www.softnicsmedia.com/blog/${blog.slug}`;
  const effectiveTitle = blog.metaTitle || `${blog.title} | Softnics Media`;
  const effectiveDesc = blog.metaDescription || blog.shortDesc || blog.title;
  const blocks = Array.isArray(blog.content)
    ? blog.content
    : Array.isArray(blog.contentBlocks)
      ? blog.contentBlocks
      : [];
  const isRichHtml = typeof blog.content === "string" && blog.content.trim().length > 0;

  return (
    <>
      <SEO
        title={effectiveTitle}
        description={effectiveDesc}
        keywords={blog.metaKeywords}
        canonical={canonicalUrl}
        ogTitle={blog.ogTitle || effectiveTitle}
        ogDescription={blog.ogDescription || effectiveDesc}
        ogImage={blog.image}
        twitterTitle={blog.twitterTitle || effectiveTitle}
        twitterDescription={blog.twitterDescription || effectiveDesc}
        twitterImage={blog.image}
        schemaCode={blog.schemaCode}
        customHeaderCode={blog.customHeaderCode}
      />

      <Box sx={{ width: "100%", bgcolor: "#f7faff", py: 5, minHeight: "100vh" }}>
        {/* Breadcrumb */}
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            px: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              to="/blogs"
              style={{
                color: "#0046C7",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Blog
            </Link>

            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "#1f2937",
              }}
            >
              {blog.title}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            maxWidth: "1100px",
            mx: "auto",
            px: { xs: 2, md: 3 },
          }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                mb: 2,
                fontSize: { xs: "1.9rem", md: "2.7rem" },
                lineHeight: 1.3,
              }}
            >
              {blog.title}
            </Typography>

            {/* Author, Date, Read Time Metadata */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, fontWeight: 500 }}
            >
              {blog.author && `By ${blog.author}`}
              {blog.author && (blog.date || blog.publishedAt) && " • "}
              {blog.date || (blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "")}
              {blog.readTime && ` • ${blog.readTime}`}
            </Typography>
          </motion.div>

          {/* Featured Image */}
          {blog.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                component="img"
                src={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  mb: 4,
                  boxShadow: "0 6px 22px rgba(0,0,0,0.10)",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          )}

          {/* Article Content: Rich Text HTML or Legacy Blocks */}
          {isRichHtml ? (
            <Box
              dangerouslySetInnerHTML={{ __html: blog.content }}
              sx={{
                lineHeight: 1.85,
                color: "#374151",
                fontSize: "1.08rem",
                "& h1, & h2": { color: "#0a2a6b", fontWeight: 700, mt: 4, mb: 2 },
                "& h3, & h4": { color: "#1e293b", fontWeight: 700, mt: 3, mb: 1.5 },
                "& p": { mb: 2.5, lineHeight: 1.85 },
                "& ul, & ol": { pl: 3.5, mb: 2.5 },
                "& li": { mb: 1 },
                "& a": { color: "#0046C7", textDecoration: "underline" },
                "& img": { maxWidth: "100%", height: "auto", borderRadius: "6px", my: 2.5 },
                "& blockquote": {
                  borderLeft: "4px solid #2563eb",
                  pl: 2.5,
                  py: 1,
                  my: 2.5,
                  fontStyle: "italic",
                  bgcolor: "#f1f5f9",
                  borderRadius: "0 6px 6px 0",
                },
              }}
            />
          ) : (
            <Box>
              {blocks.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                          mt: 4,
                          mb: 2,
                          fontWeight: 700,
                          color: "#0a2a6b",
                        }}
                      >
                        {block.text}
                      </Typography>
                    </motion.div>
                  );
                }

                if (block.type === "paragraph") {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        sx={{
                          mb: 2,
                          lineHeight: 1.85,
                          color: "#374151",
                          fontSize: "1.08rem",
                        }}
                      >
                        {block.text}
                      </Typography>
                    </motion.div>
                  );
                }

                if (block.type === "list") {
                  const items = Array.isArray(block.items)
                    ? block.items
                    : typeof block.items === "string"
                      ? JSON.parse(block.items || "[]")
                      : [];

                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        paddingLeft: "22px",
                        marginBottom: "20px",
                        marginTop: "10px",
                      }}
                    >
                      {items.map((item, i) => (
                        <li key={i} style={{ marginBottom: "10px" }}>
                          <Typography
                            sx={{
                              lineHeight: 1.8,
                              color: "#374151",
                              fontSize: "1.05rem",
                            }}
                          >
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </motion.ul>
                  );
                }
                return null;
              })}
            </Box>
          )}

          {/* Back to blogs link */}
          <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid #e2e8f0" }}>
            <Button
              component={Link}
              to="/blogs"
              startIcon={<ArrowBackIcon />}
              sx={{ fontWeight: 600, textTransform: "none" }}
            >
              Back to All Insights
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogsPageDetails;

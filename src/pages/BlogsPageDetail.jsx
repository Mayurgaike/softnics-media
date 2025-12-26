import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { motion } from "framer-motion";

const BlogsPageDetails = () => {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  // ⭐ ALWAYS SCROLL TO TOP WHEN BLOG CHANGES
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"   // use auto for instant, smooth causes slight lag
    });
  }, [slug]);

  if (!blog) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" color="error">
          Blog Not Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "#f7faff", py: 5, minHeight: "100vh" }}>
      
      {/* Breadcrumb */}
      <Box
        sx={{
          maxWidth: "1200px",
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
          maxWidth: "1200px",
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
            sx={{
              fontWeight: 800,
              color: "primary.main",
              mb: 3,
              lineHeight: 1.3,
            }}
          >
            {blog.title}
          </Typography>
        </motion.div>

        {/* Image */}
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
              borderRadius: "4px",
              mb: 4,
              boxShadow: "0 6px 22px rgba(0,0,0,0.12)",
              maxHeight: "480px",
              objectFit: "cover",
            }}
          />
        </motion.div>

        {/* Blog Content */}
        <Box>
          {blog.content.map((block, index) => {
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
                  {block.items.map((item, i) => (
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
      </Box>
    </Box>
  );
};

export default BlogsPageDetails;

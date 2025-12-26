import React from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const BlogPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        px: { xs: 2, md: 4 },
        background: "linear-gradient(180deg,#f5f9ff,#eef4ff)",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={800}
        mb={6}
        color="primary.main"
      >
        Our Latest Blogs
      </Typography>

      {/* Cards Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 3, sm: 3, md: 4 },
          maxWidth: "1350px",
          mx: "auto",
        }}
      >
        {blogs.map((blog, index) => (
          <Box
            component={motion.div}
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            sx={{
              width: { 
                xs: "100%", 
                sm: "calc(50% - 12px)",
                md: "calc(33.333% - 21px)"
              },
            }}
          >
            <Card
              sx={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.3s ease",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "420px",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                }}
              />

              {/* Content */}
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "text.primary",
                    lineHeight: 1.3,
                  }}
                >
                  {blog.title}
                </Typography>

                {/* Short Description */}
                <Typography
  sx={{
    mb: 2,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "0.95rem",
    color: "text.secondary",
    flexGrow: 1,
    lineHeight: "1.55",          // Slight adjustment
    maxHeight: "4.65rem",        // EXACT 3 lines height
  }}
>
  {blog.shortDesc}
</Typography>



                {/* Read More */}
                <Link
                  to={`/blog/${blog.slug}`}
                  style={{
                    color: "#0046C7",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    marginTop: "auto",
                  }}
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlogPage;
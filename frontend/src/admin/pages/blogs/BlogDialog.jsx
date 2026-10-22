import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, CircularProgress, Box } from "@mui/material";
import BlogForm from "./BlogForm";
import { fetchAdminBlog } from "../../../api/api";

const BlogDialog = ({ open, onClose, blog, onSaved }) => {
  const [fullBlog, setFullBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog?.id) {
      setLoading(true);
      fetchAdminBlog(blog.id)
        .then((data) => setFullBlog(data))
        .catch((err) => {
          console.error("Failed to fetch admin blog detail:", err);
          setFullBlog(blog);
        })
        .finally(() => setLoading(false));
    } else {
      setFullBlog(null);
      setLoading(false);
    }
  }, [blog]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth scroll="paper">
      <DialogTitle sx={{ fontWeight: 800, borderBottom: "1px solid #e2e8f0" }}>
        {blog ? `Edit Blog: ${blog.title || ""}` : "Create New Blog"}
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <BlogForm
            blog={fullBlog}
            onSubmit={onClose}
            onSaved={() => {
              onClose();
              if (onSaved) onSaved();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;

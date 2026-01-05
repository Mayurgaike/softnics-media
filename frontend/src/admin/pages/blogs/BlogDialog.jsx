import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { fetchBlog } from "../../../api/api";

const BlogDialog = ({ open, onClose, blog }) => {
  const [fullBlog, setFullBlog] = useState(null);

  useEffect(() => {
    if (blog?.slug) {
      fetchBlog(blog.slug).then(setFullBlog);
    } else {
      setFullBlog(null);
    }
  }, [blog]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{blog ? "Edit Blog" : "Add Blog"}</DialogTitle>
      <DialogContent>
        <BlogForm blog={fullBlog} onSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default BlogDialog;

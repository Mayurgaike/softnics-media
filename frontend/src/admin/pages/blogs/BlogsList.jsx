import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Pagination,
  Stack,
  CircularProgress,
  Tooltip,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import ArticleIcon from "@mui/icons-material/Article";

import {
  fetchAdminBlogs,
  deleteBlog,
  updateBlog,
} from "../../../api/api";
import BlogDialog from "./BlogDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetchAdminBlogs({
        q: search,
        status: statusFilter,
        page,
        limit,
      });
      if (res && res.blogs) {
        setBlogs(res.blogs);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } else if (Array.isArray(res)) {
        setBlogs(res);
        setTotal(res.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to load admin blogs:", err);
      const isAuthError =
        err?.message === "Unauthorized" || err?.message === "Invalid token";
      const msg = isAuthError
        ? "Session expired or not logged in. Please log in again."
        : err?.message || "Failed to load blogs. Check that the backend server is running.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page, limit]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    try {
      await deleteBlog(deleteId);
      setDeleteId(null);
      load();
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleToggleStatus = async (blog) => {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    try {
      const fd = new FormData();
      fd.append("status", nextStatus);
      await updateBlog(blog.id, fd);
      load();
    } catch (err) {
      console.error("Failed to toggle blog status:", err);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Blogs Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your articles, rich text content, cover images, and SEO tags ({total} total)
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
          sx={{ borderRadius: 2 }}
        >
          Add Blog
        </Button>
      </Box>

      {/* Error Banner */}
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      )}

      {/* Filter and Search Bar */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
          <TextField
            placeholder="Search blogs by title, slug, summary, or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {/* Blogs Table */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : blogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No blogs found matching your search.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Cover Image</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Slug</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Author & Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {blogs.map((b) => (
                <TableRow key={b.id} hover>
                  <TableCell>
                    {b.image ? (
                      <Box
                        component="img"
                        src={b.image}
                        alt={b.title}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = "flex";
                          }
                        }}
                        sx={{
                          width: 56,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 1,
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    ) : null}
                    <Box
                      sx={{
                        width: 56,
                        height: 40,
                        bgcolor: "#e2e8f0",
                        borderRadius: 1,
                        display: b.image ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArticleIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {b.title}
                    </Typography>
                    {b.shortDesc && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          maxWidth: 320,
                        }}
                      >
                        {b.shortDesc}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        /{b.slug}
                      </Typography>
                      {b.status === "published" && (
                        <Tooltip title="View Live Article">
                          <IconButton
                            size="small"
                            component="a"
                            href={`/blog/${b.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OpenInNewIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{b.author || "Softnics Team"}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {b.date || (b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : "—")}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={(b.status || "draft").toUpperCase()}
                      color={b.status === "published" ? "success" : "default"}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title={b.status === "published" ? "Unpublish (Move to Draft)" : "Publish Blog"}>
                      <IconButton
                        size="small"
                        color={b.status === "published" ? "warning" : "success"}
                        onClick={() => handleToggleStatus(b)}
                      >
                        {b.status === "published" ? <UnpublishedIcon fontSize="small" /> : <PublishIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Blog">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setSelected(b);
                          setOpenForm(true);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Blog">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteId(b.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}

      {/* Blog Dialog */}
      <BlogDialog
        open={openForm}
        blog={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
        }}
        onSaved={() => {
          setOpenForm(false);
          setSelected(null);
          load();
        }}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post? It will be removed from the public website."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default BlogsList;

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

import {
  fetchAdminServices,
  deleteService,
  updateService,
  fetchAdminService,
} from "../../../api/api";
import ServiceDialog from "./ServiceDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const ServicesList = () => {
  const [services, setServices] = useState([]);
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
      const res = await fetchAdminServices({
        q: search,
        status: statusFilter,
        page,
        limit,
      });
      if (res && res.services) {
        setServices(res.services);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } else if (Array.isArray(res)) {
        setServices(res);
        setTotal(res.length);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to load admin services:", err);
      const isAuthError =
        err?.message === "Unauthorized" || err?.message === "Invalid token";
      const msg = isAuthError
        ? "Session expired or not logged in. Please log in again."
        : err?.message || "Failed to load services. Check that the backend server is running.";
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
      await deleteService(deleteId);
      setDeleteId(null);
      load();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  const handleEditClick = async (service) => {
    try {
      // Fetch fresh full details including rich text and offerings
      const fresh = await fetchAdminService(service.id);
      setSelected(fresh);
    } catch (e) {
      setSelected(service);
    }
    setOpenForm(true);
  };

  const handleToggleStatus = async (service) => {
    const nextStatus = service.status === "published" ? "draft" : "published";
    try {
      const fd = new FormData();
      fd.append("status", nextStatus);
      await updateService(service.id, fd);
      load();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Services Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your service pages, rich body content, and SEO metadata ({total} total)
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
          Add Service
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
            placeholder="Search services by title, slug, or description..."
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

      {/* Services Table */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : services.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No services found matching your criteria.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Image / Icon</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>URL Slug</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    {s.image || s.icon ? (
                      <Box
                        component="img"
                        src={s.image || s.icon}
                        alt={s.title}
                        sx={{
                          width: 44,
                          height: 44,
                          objectFit: "contain",
                          borderRadius: 1,
                          bgcolor: "#f1f5f9",
                          p: 0.5,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: "#e2e8f0",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {s.title}
                    </Typography>
                    {s.description && (
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
                        {s.description}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        /{s.slug}
                      </Typography>
                      {s.status === "published" && (
                        <Tooltip title="View Live Service Page">
                          <IconButton
                            size="small"
                            component="a"
                            href={`/services/${s.slug}`}
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
                    <Chip
                      label={(s.status || "draft").toUpperCase()}
                      color={s.status === "published" ? "success" : "default"}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title={s.status === "published" ? "Unpublish (Move to Draft)" : "Publish Service"}>
                      <IconButton
                        size="small"
                        color={s.status === "published" ? "warning" : "success"}
                        onClick={() => handleToggleStatus(s)}
                      >
                        {s.status === "published" ? <UnpublishedIcon fontSize="small" /> : <PublishIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Service">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(s)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Service">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteId(s.id)}
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

      {/* Dialog for Create / Edit */}
      <ServiceDialog
        open={openForm}
        service={selected}
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

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? It will be removed from the public website."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ServicesList;

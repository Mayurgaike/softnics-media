import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { createService, updateService } from "../../../api/api";

const ServiceForm = ({ open, onClose, service, onSaved }) => {
  const isEdit = !!service?.id;

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    intro: "",
    closing: "",
    offerings: [],
    iconFile: null,
    iconPreview: null,
  });

  useEffect(() => {
    if (service) {
      setForm({
        slug: service.slug || "",
        title: service.title || "",
        description: service.description || "",
        intro: service.intro || "",
        closing: service.closing || "",
        offerings: service.offerings?.map((o) => o.text) || [],
        iconFile: null,
        iconPreview: service.icon || null,
      });
    }
  }, [service]);

  const handleIconChange = (file) => {
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      iconFile: file,
      iconPreview: URL.createObjectURL(file),
    }));
  };

  const submit = async () => {
    const fd = new FormData();

    fd.append("slug", form.slug);
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("intro", form.intro);
    fd.append("closing", form.closing);
    fd.append("offerings", JSON.stringify(form.offerings));

    if (form.iconFile) {
      fd.append("icon", form.iconFile);
    }

    if (isEdit) {
      await updateService(service.id, fd);
    } else {
      await createService(fd);
    }

    onSaved();
  };

  return (
    <Box>
      <Stack>
        <Stack spacing={2.5} mt={1}>
          <TextField
            label="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            fullWidth
          />

          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            fullWidth
          />

          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            multiline
            rows={2}
          />

          <TextField
            label="Intro"
            value={form.intro}
            onChange={(e) => setForm({ ...form, intro: e.target.value })}
            multiline
            rows={3}
          />

          <TextField
            label="Closing"
            value={form.closing}
            onChange={(e) => setForm({ ...form, closing: e.target.value })}
            multiline
            rows={3}
          />

          {/* 🔹 ICON UPLOAD + PREVIEW */}
          <Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography fontWeight={600}>Service Icon</Typography>
              <Typography fontWeight={200} mb={1}>
                (in a blue color "#0046C7")
              </Typography>
            </Box>

            {form.iconPreview && (
              <Box
                sx={{
                  mb: 1.5,
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                }}
              >
                <Box
                  component="img"
                  src={form.iconPreview}
                  alt="Icon preview"
                  sx={{
                    maxWidth: "70%",
                    maxHeight: "70%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <Button variant="outlined" component="label">
              {form.iconPreview ? "Change Icon" : "Upload Icon"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleIconChange(e.target.files[0])}
              />
            </Button>
          </Box>

          {/* 🔹 OFFERINGS */}
          <Typography fontWeight={600}>Offerings</Typography>

          {form.offerings.map((o, i) => (
            <Stack key={i} direction="row" spacing={1}>
              <TextField
                fullWidth
                value={o}
                onChange={(e) => {
                  const arr = [...form.offerings];
                  arr[i] = e.target.value;
                  setForm({ ...form, offerings: arr });
                }}
              />
              <IconButton
                onClick={() =>
                  setForm({
                    ...form,
                    offerings: form.offerings.filter((_, x) => x !== i),
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          <Button
            onClick={() =>
              setForm({ ...form, offerings: [...form.offerings, ""] })
            }
          >
            + Add Offering
          </Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submit}>
          Save Service
        </Button>
      </Stack>
    </Box>
  );
};

export default ServiceForm;

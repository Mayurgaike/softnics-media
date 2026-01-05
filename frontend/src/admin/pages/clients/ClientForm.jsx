import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { updateClient, createClient } from "../../../api/api";

const emptyClient = {
  slug: "",
  name: "",
  shortSummary: "",
  logoHeight: "70%",
  logoWidth: "70%",
  details: [""],
  links: [{ platform: "", url: "" }],
  logoFile: null,
};

const ClientForm = ({ initialData, onSubmit, onCancel }) => {
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState(emptyClient);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyClient,
        slug: initialData.slug,
        name: initialData.name,
        shortSummary: initialData.shortSummary,
        logoHeight: initialData.logoHeight,
        logoWidth: initialData.logoWidth,
        details: initialData.details?.map((d) => d.text) || [""],
        links:
          initialData.links?.map((l) => ({
            platform: l.platform,
            url: l.url,
          })) || [{ platform: "", url: "" }],
      });

      setPreview(initialData.logo || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, value) => {
    const updated = [...form.details];
    updated[index] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => {
    setForm({ ...form, details: [...form.details, ""] });
  };

  const removeDetail = (index) => {
    setForm({
      ...form,
      details: form.details.filter((_, i) => i !== index),
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, logoFile: file });
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    const fd = new FormData();

    // ❌ DO NOT SEND id
    fd.append("slug", form.slug);
    fd.append("name", form.name);
    fd.append("shortSummary", form.shortSummary);
    fd.append("logoHeight", form.logoHeight);
    fd.append("logoWidth", form.logoWidth);

    if (form.logoFile) {
      fd.append("logo", form.logoFile);
    }

    fd.append("details", JSON.stringify(form.details));

    const linksObject = {};
    form.links.forEach(({ platform, url }) => {
      if (platform && url) linksObject[platform] = url;
    });
    fd.append("links", JSON.stringify(linksObject));

    if (isEdit) {
      await updateClient(initialData.id, fd);
    } else {
      await createClient(fd);
    }

    onSubmit?.();
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={700}>
          Client Details
        </Typography>

        <TextField
          label="Client Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          helperText="Used in URLs (unique)"
          fullWidth
          disabled={isEdit} // 🔒 slug should NOT change after creation
        />

        <TextField
          label="Client Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Short Summary"
          name="shortSummary"
          value={form.shortSummary}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Logo Width"
            name="logoWidth"
            value={form.logoWidth}
            onChange={handleChange}
          />
          <TextField
            label="Logo Height"
            name="logoHeight"
            value={form.logoHeight}
            onChange={handleChange}
          />
        </Stack>

        <Divider />

        <Typography fontWeight={700}>Client Logo</Typography>

        {preview && (
          <Box>
            <img
              src={preview}
              alt="preview"
              style={{ height: 60, objectFit: "contain" }}
            />
          </Box>
        )}

        <Button variant="outlined" component="label">
          Upload Logo
          <input hidden type="file" accept="image/*" onChange={handleLogoChange} />
        </Button>

        <Divider />

        <Typography fontWeight={700}>Highlights / Details</Typography>

        {form.details.map((d, i) => (
          <Stack direction="row" spacing={1} key={i}>
            <TextField
              value={d}
              onChange={(e) => handleDetailChange(i, e.target.value)}
              fullWidth
            />
            <Button color="error" onClick={() => removeDetail(i)}>
              ✕
            </Button>
          </Stack>
        ))}

        <Button onClick={addDetail}>+ Add Detail</Button>

        <Divider />

        <Typography fontWeight={700}>Social Links</Typography>

        {form.links.map((link, index) => (
          <Stack direction="row" spacing={2} key={index} alignItems="center">
            <TextField
              label="Platform"
              value={link.platform}
              onChange={(e) => {
                const updated = [...form.links];
                updated[index].platform = e.target.value;
                setForm({ ...form, links: updated });
              }}
              sx={{ width: 180 }}
            />

            <TextField
              label="URL"
              value={link.url}
              onChange={(e) => {
                const updated = [...form.links];
                updated[index].url = e.target.value;
                setForm({ ...form, links: updated });
              }}
              fullWidth
            />

            <Button
              color="error"
              onClick={() =>
                setForm({
                  ...form,
                  links: form.links.filter((_, i) => i !== index),
                })
              }
            >
              ✕
            </Button>
          </Stack>
        ))}

        <Button
          onClick={() =>
            setForm({
              ...form,
              links: [...form.links, { platform: "", url: "" }],
            })
          }
        >
          + Add Social Link
        </Button>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Save Client
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ClientForm;

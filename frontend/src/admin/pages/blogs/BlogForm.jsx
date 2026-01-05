import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createBlog, updateBlog } from "../../../api/api";

const emptyBlock = { type: "paragraph", text: "", items: [] };

const BlogForm = ({ blog, onSubmit }) => {
  const isEdit = !!blog?.id;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: "",
    readTime: "",
    shortDesc: "",
    content: [],
    imageFile: null,
  });

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title,
        slug: blog.slug,
        date: blog.date,
        readTime: blog.readTime,
        shortDesc: blog.shortDesc,
        content: blog.content || [],
        imageFile: null,
      });
    }
  }, [blog]);

  const submit = async () => {
    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => {
      if (k !== "imageFile" && k !== "content") fd.append(k, v);
    });

    fd.append("content", JSON.stringify(form.content));

    if (form.imageFile) {
      fd.append("image", form.imageFile);
    }

    if (isEdit) {
      await updateBlog(blog.id, fd);
    } else {
      await createBlog(fd);
    }

    onSubmit();
  };

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <TextField
          label="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <TextField
          label="Read Time"
          value={form.readTime}
          onChange={(e) => setForm({ ...form, readTime: e.target.value })}
        />

        <TextField
          label="Short Description"
          value={form.shortDesc}
          multiline
          rows={3}
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
        />

        <Button component="label" variant="outlined">
          Upload Cover Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          />
        </Button>

        <Typography fontWeight={700}>Content Blocks</Typography>

        {form.content.map((b, i) => (
          <Stack key={i} spacing={1}>
            <TextField
              select
              label="Type"
              value={b.type}
              onChange={(e) => {
                const arr = [...form.content];
                arr[i].type = e.target.value;
                setForm({ ...form, content: arr });
              }}
            >
              <MenuItem value="heading">Heading</MenuItem>
              <MenuItem value="subheading">Subheading</MenuItem>
              <MenuItem value="paragraph">Paragraph</MenuItem>
              <MenuItem value="list">List</MenuItem>
            </TextField>

            <TextField
              label="Text"
              multiline
              value={b.text || ""}
              onChange={(e) => {
                const arr = [...form.content];
                arr[i].text = e.target.value;
                setForm({ ...form, content: arr });
              }}
            />

            <IconButton
              color="error"
              onClick={() =>
                setForm({
                  ...form,
                  content: form.content.filter((_, x) => x !== i),
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}

        <Button
          onClick={() =>
            setForm({ ...form, content: [...form.content, emptyBlock] })
          }
        >
          + Add Block
        </Button>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={onSubmit}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Save Blog
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BlogForm;

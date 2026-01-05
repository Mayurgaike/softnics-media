import { useEffect, useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { fetchBlogs, deleteBlog } from "../../../api/api";
import BlogDialog from "./BlogDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    const data = await fetchBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    await deleteBlog(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Blogs
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
        >
          Add Blog
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.slug}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelected(b);
                      setOpenForm(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteId(b.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <BlogDialog
        open={openForm}
        blog={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
          load();
        }}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Blog"
        message="This blog will be removed. Continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default BlogsList;

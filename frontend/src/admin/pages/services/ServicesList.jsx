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

import { fetchServices, deleteService } from "../../../api/api";
import ServiceDialog from "./ServiceDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    const data = await fetchServices();
    setServices(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    await deleteService(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Services
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
        >
          Add Service
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
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.title}</TableCell>
                <TableCell>{s.slug}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelected(s);
                      setOpenForm(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => setDeleteId(s.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* CREATE / EDIT */}
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

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Service"
        message="This service will be removed. Continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ServicesList;

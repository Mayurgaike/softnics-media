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

import { fetchClients, deleteClient } from "../../../api/api";
import ClientDialog from "./ClientDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    const data = await fetchClients();
    setClients(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setOpenForm(true);
  };

  const handleEdit = (client) => {
    setSelected(client);
    setOpenForm(true);
  };

  const handleDelete = async () => {
    await deleteClient(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Clients
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Client
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>
                  <img src={client.logo} height={30} alt={client.name} />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(client)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setDeleteId(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* CREATE / EDIT */}
      <ClientDialog
        open={openForm}
        client={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
          load();
        }}
      />

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Client"
        message="This client will be removed. Continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ClientsList;

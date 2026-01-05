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

import { fetchTeam, deleteTeam } from "../../../api/api";
import TeamDialog from "./TeamDialog";
import ConfirmDialog from "../../components/ConfirmDialog";

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = async () => {
    const data = await fetchTeam();
    setTeam(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    await deleteTeam(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Team
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setSelected(null);
            setOpenForm(true);
          }}
        >
          Add Member
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {team.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelected(m);
                      setOpenForm(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => setDeleteId(m.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <TeamDialog
        open={openForm}
        member={selected}
        onClose={() => {
          setOpenForm(false);
          setSelected(null);
          load();
        }}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Team Member"
        message="This member will be removed. Continue?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default TeamList;

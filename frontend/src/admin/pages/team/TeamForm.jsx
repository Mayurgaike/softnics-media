import { useEffect, useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import { createTeam, updateTeam } from "../../../api/api";

const empty = { name: "", role: "" };

const TeamForm = ({ initialData, onSubmit, onCancel }) => {
  const isEdit = !!initialData?.id;
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const submit = async () => {
    if (isEdit) {
      await updateTeam(initialData.id, form);
    } else {
      await createTeam(form);
    }
    onSubmit();
  };

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
        />

        <TextField
          label="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={submit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TeamForm;

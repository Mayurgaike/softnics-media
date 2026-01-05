import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import TeamForm from "./TeamForm";

const TeamDialog = ({ open, onClose, member }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {member ? "Edit Team Member" : "Add Team Member"}
      </DialogTitle>
      <DialogContent>
        <TeamForm
          initialData={member}
          onSubmit={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TeamDialog;

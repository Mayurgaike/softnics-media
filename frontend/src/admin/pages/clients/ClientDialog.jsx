import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ClientForm from "./ClientForm";

const ClientDialog = ({ open, onClose, client }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {client ? "Edit Client" : "Add Client"}
      </DialogTitle>

      <DialogContent>
        <ClientForm
          initialData={client}
          onSubmit={() => onClose()}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
export default ClientDialog;
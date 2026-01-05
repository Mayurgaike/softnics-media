import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ServiceForm from "./ServiceForm";

const ServiceDialog = ({ open, onClose, service, onSaved }) => {
    console.log("ServiceDialog render", { service });
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {service ? "Edit Service" : "Add Service"}
      </DialogTitle>

      <DialogContent>
        <ServiceForm
          service={service}
          onClose={onClose}
          onSaved={onSaved}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;

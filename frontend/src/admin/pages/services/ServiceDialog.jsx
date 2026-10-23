import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import ServiceForm from "./ServiceForm";

const ServiceDialog = ({ open, onClose, service, onSaved }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      disableEnforceFocus
      disableAutoFocus
    >
      <DialogTitle sx={{ fontWeight: 800, borderBottom: "1px solid #e2e8f0" }}>
        {service ? `Edit Service: ${service.title || ""}` : "Create New Service"}
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
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

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface AddTaskDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Error found"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Something went wrong. Please try again later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;

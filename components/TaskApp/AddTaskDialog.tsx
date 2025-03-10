import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

interface AddTaskDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  saveData: (name: string, data: string, isEdit: boolean) => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ open, onClose, saveData }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const name = formJson.taskName;
          const data = formJson.taskData;
          saveData(name, data, false);
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Add a task"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Fill the form to add a task
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="taskName"
          name="taskName"
          label="Task Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="taskData"
          name="taskData"
          label="Task Info"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button type="submit" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;

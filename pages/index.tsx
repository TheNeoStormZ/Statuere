import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AppBar from "../components/appBar";

export default function Home() {
  const [showAddDiag, setShowDiag] = useState(false);

  const handleButtonClick = () => {
    setShowDiag(true);
  };

  return (
    <Container maxWidth="lg">
      <AppBar onButtonClick={handleButtonClick} />
      <Dialog
        open={showAddDiag}
        onClose={setShowDiag}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            setShowDiag(false);
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
          <Button onClick={() => setShowDiag(false)}>Cancel</Button>
          <Button type="submit" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          my: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Task App
        </Typography>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardActionArea onClick={() => alert("yeah")}>
            <CardHeader avatar={<TaskAltIcon />} />

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Test
              </Typography>
              <Typography>description</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              width: "100%",
              justifyContent: "flex-end",
              pr: 3,
              mt: "auto",
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={() => alert("DELETE TRIGGER")}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

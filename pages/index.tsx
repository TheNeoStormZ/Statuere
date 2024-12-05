import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Button,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import AppBar from "../components/appBar";
import {
  Task
} from "../functions/taskData";

export default function Home() {
  const [showAddDiag, setShowDiag] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleButtonClick = () => {
    setShowDiag(true);
  };

  const getData = async () => {
    const response = await axios.get("/api/todos");
    setTasks(JSON.parse(response.data.data));
  };

  const saveData = async (name: string, taskData: string) => {
    const response = await axios.post(
      "/api/todos",
      { name, taskData: taskData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setShowDiag(false);
    await getData();
  };

  const deleteData = async (index: number) => {
    const response = await axios.delete("/api/todos/"+ index);
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <AppBar onButtonClick={handleButtonClick} />
      <Container>
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
              const name = formJson.taskName;
              const data = formJson.taskData;
              saveData(name, data);
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
            My Tasks
          </Typography>

          {tasks.length == 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100vh"
            >
              <DoneAllIcon
                sx={{
                  fontSize: 60,
                  mb: 2,
                }}
              />
              <Typography
                variant="h4"
                component="h4"
                sx={{ mb: 2, textAlign: "center" }}
              >
                No tasks found, everything is up to date!
              </Typography>
            </Box>
          )}

          {tasks &&
            tasks.length !== 0 &&
            tasks.map((task, index) => (
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  marginBottom: 2,
                  flexDirection: "column",
                }}
              >
                <CardHeader avatar={<TaskAltIcon />} />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {task.name}
                  </Typography>
                  <Typography>{task.taskData}</Typography>
                </CardContent>

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
                    onClick={() => deleteData(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
        </Box>
      </Container>
    </Box>
  );
}

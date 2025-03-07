"use client"

import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { CardActions, CardHeader, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTaskDialog from "../components/AddTaskDialog";
import AppBar from "../components/appBar";
import ErrorDialog from "../components/ErrorDialog";
import { Task } from "../functions/taskData";

import { authClient } from "../lib/auth-client" // import the auth client 


export default function Home() {
  const [showAddDiag, setShowDiag] = useState(false);
  const [showErrorDiag, setShowErrorDiag] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);


  const handleButtonClick = () => {
    setShowDiag(true);
  };

  const getData = async () => {
    let response;
    const { data: session, error } = await authClient.getSession();

    console.log(session);
  
    try {
      response = await axios.get("/api/todos");
      setTasks(JSON.parse(response.data.data));
    } catch {
      setShowErrorDiag(true);
      console.log("Error found while updating data");
    }
  };

  const saveData = async (
    name: string,
    taskData: string,
    completed: boolean
  ) => {
    let response;
    try {
      response = await axios.post(
        "/api/todos",
        { name, taskData: taskData, completed },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      setShowErrorDiag(true);
      console.log("Error found while saving data");
    }
    setShowDiag(false);
    await getData();
  };

  const deleteData = async (index: number) => {
    let response;
    try {
      response = await axios.delete("/api/todos/" + index);
    } catch {
      setShowErrorDiag(true);
      console.log("Error found while deleting");
    }
    await getData();
  };

  const doneMark = async (index: number) => {
    let response;
    try {
      response = await axios.put("/api/todos/" + index);
    } catch {
      setShowErrorDiag(true);
      console.log("Error found while updating data");
    }
    await getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <AppBar onButtonClick={handleButtonClick} />
      <Container>
        <AddTaskDialog
          open={showAddDiag}
          onClose={setShowDiag}
          saveData={saveData}
        />
        <ErrorDialog open={showErrorDiag} onClose={setShowErrorDiag} />
        <Box
        key="global-box"
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
            tasks
              .filter((task) => !task.completed)
              .map((task, index) => (
                <Card
                key={index}
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
                    <IconButton
                      aria-label="done"
                      onClick={() => doneMark(index)}
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}

          {tasks && tasks.filter((task) => task.completed).length !== 0 && (
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Completed tasks
            </Typography>
          )}

          {tasks &&
            tasks.length !== 0 &&
            tasks
              .filter((task) => task.completed)
              .map((task, index) => (
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

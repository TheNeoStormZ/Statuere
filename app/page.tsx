"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import TasksComponent from "../components/TaskApp/TasksComponent";
import { Task } from "../functions/taskData";
import useFetchTasksHook from "../hooks/useFetchTasks";

export default function Home() {
  
  const [showErrorDiag, setShowErrorDiag] = useState(false);

  const { tasks, refreshing, fetchTasks} = useFetchTasksHook(() => axios.get("/api/todos"));


  const getData = async () => {
    try {
      await fetchTasks();
    } catch {
      setShowErrorDiag(true);
      console.log("Error found while updating data");
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <> 
        <TasksComponent setShowErrorDiag={setShowErrorDiag} showErrorDiag={showErrorDiag} getData={getData} tasks={tasks as Task[]} refreshing={refreshing}/>
    </>
  );
}

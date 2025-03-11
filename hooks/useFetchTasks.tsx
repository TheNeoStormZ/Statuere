import { AxiosResponse } from "axios";
import { Task } from "../functions/taskData";
import { useState, useCallback } from "react";

interface UseFetchTasksResult {
  tasks: Task[] | undefined;
  refreshing: boolean;
  fetchTasks: () => Promise<void>;
}

const useFetchTasksHook = (

  getTasks: () => Promise<AxiosResponse<any, any>>,


): UseFetchTasksResult => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [refreshing, setRefreshing] = useState<boolean>(false);


  const fetchTasks = useCallback(async () => { 
    setRefreshing(true);

    try {
      let response = (await getTasks()); 
      setTasks(JSON.parse(response.data.data));
    } catch (err: any) { 
      throw("Error reading data: " + err.message);
      
    } finally {
      setRefreshing(false);
    }
  }, [getTasks]); 


  return {
    tasks,
    refreshing,
    fetchTasks, 
  };
};

export default useFetchTasksHook;

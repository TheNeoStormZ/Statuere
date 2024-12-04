import { getCookie, setCookie } from './cookieUtils';


export interface Task {
  name: string;
  taskData: string;
}

export const saveDataImpl = async (task: Task) => {
  const tasks = await getCookie("tasksData");
  if (!tasks) {
    setCookie("tasksData",JSON.stringify([task]));
  } else {
    const tasksParsed = JSON.parse(tasks) as Task[];
    tasksParsed.push(task);
    setCookie("tasksData",JSON.stringify(tasksParsed));
  }
};

export const getDataImpl = async (): Promise<Task[]> => {
    
    const tasks = await getCookie("tasksData");

  if (!tasks) {
    return [];
  } else {
    const tasksParsed = JSON.parse(tasks) as Task[];
    return tasksParsed;
  }
};

export const delDataImpl = async (index: number) => {
    const tasks = await getCookie("tasksData");
  
    if (!tasks) {
      return [];
    } else {
      const tasksParsed = JSON.parse(tasks) as Task[];
      tasksParsed.splice(index,1);
      setCookie("tasksData",JSON.stringify(tasksParsed));
    }
  };

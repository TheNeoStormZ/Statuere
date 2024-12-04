export interface Task {
  name: string;
  taskData: string;
}

export const saveDataImpl = (task: Task) => {
  const tasks = localStorage.getItem("tasksData");

  if (!tasks) {
    alert("no data saved!");
    localStorage.setItem("tasksData", JSON.stringify([task]));
  } else {
    const tasksParsed = JSON.parse(tasks) as Task[];
    tasksParsed.push(task);
    localStorage.setItem("tasksData", JSON.stringify(tasksParsed));
  }
};

export const getDataImpl = (): Task[] => {
  const tasks = localStorage.getItem("tasksData");

  if (!tasks) {
    return [];
  } else {
    const tasksParsed = JSON.parse(tasks) as Task[];
    return tasksParsed;
  }
};

export const delDataImpl = (index: number) => {
    const tasks = localStorage.getItem("tasksData");
  
    if (!tasks) {
      return [];
    } else {
      const tasksParsed = JSON.parse(tasks) as Task[];
      tasksParsed.splice(index,1);
      localStorage.setItem("tasksData", JSON.stringify(tasksParsed));
    }
  };

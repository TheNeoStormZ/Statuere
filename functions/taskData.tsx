export interface Task {
    name: string;
    taskData: string;
    completed: boolean;
  }
  
  let tasks: Task[] = [];
  
  export const saveDataImpl = async (task: Task) => {
    tasks.push(task);
  };
  
  export const getDataImpl = async (): Promise<Task[]> => {
    return tasks;
  };
  
  export const delDataImpl = async (index: number) => {
    tasks.splice(index, 1);
  };

  export const setCompletedImpl = async (index: number) => {
    let {name, taskData, completed} = tasks[index];
    tasks.splice(index, 1);
    const task: Task = { name: name, taskData: taskData,completed: true };
    await saveDataImpl(task);
  };

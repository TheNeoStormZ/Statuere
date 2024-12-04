export interface Task {
    name: string;
    taskData: string;
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
  
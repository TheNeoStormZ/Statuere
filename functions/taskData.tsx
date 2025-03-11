import { Collection, FindCursor, MongoClient, ServerApiVersion, WithId } from 'mongodb';
import dotenv from 'dotenv';
import { authClient } from '../lib/auth-client';
import { auth } from '../auth';
import { headers } from 'next/headers';
dotenv.config();


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const databaseName = process.env.MONGODB_DATABASE || 'statuere'; 
const mongoOptions = process.env.MONGODB_OPTIONS || ""; 

let connectionString = `mongodb+srv://${username}:${password}@${clusterAddress}/${databaseName}${mongoOptions}`;

if (!databaseName) {
    connectionString = `mongodb+srv://${username}:${password}@${clusterAddress}${mongoOptions}`;
}

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db("statuere");
const collection_name = "tasks";

export interface Task {
  id: string;
  name: string;
  taskData: string;
  completed: boolean;
  userId: string;
}

const getCollection = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
})
  if (session && session?.user){
    try {
      const collection =  db.collection<Task>(collection_name);
      return  collection.find({ userId: session.user.id});
    } catch (error) {
      console.error('Error', error);
      throw error;
    } 
  }
};


export const saveDataImpl = async (task: Task) => {
  const session = await auth.api.getSession({
    headers: await headers()
})

  try {
    if (session && session?.user){
      task.userId = session.user.id;
      task.id = crypto.randomUUID();
      const collection = db.collection<Task>(collection_name);
      await collection?.insertOne(task);
    }
  } catch (error) {
    console.error('Error in saveDataImpl:', error);
    throw error;
  } 
};

export const getDataImpl = async (): Promise<Task[]> => {
  try {
    const tasksCursor = await getCollection();
    if (tasksCursor) {
      const tasksArray = await tasksCursor.toArray();
      return tasksArray as Task[];
    }
    return [];
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};

export const delDataImpl = async (index: string) => {
  try {
    const collection = db.collection<Task>(collection_name);
    const tasks = await getDataImpl();
      const taskToDelete = tasks.find(task => task.id == index);

      if (taskToDelete && taskToDelete.id) {
        await collection?.deleteOne({ id: taskToDelete.id });
      } else {
        console.warn("Task at index", index, "does not have a valid id for deletion.");
      }

  } catch (error) {
    console.error('Error in delDataImpl:', error);
  }
};

export const setCompletedImpl = async (index: string) => {
  const session = await auth.api.getSession({
    headers: await headers()
})
  if (session && session?.user) {
    try {
      const collection = db.collection<Task>(collection_name);
      const tasks = await getDataImpl();
        const taskToUpdate = tasks.find(task => task.id == index);
        if (taskToUpdate && taskToUpdate.id) {
          await collection?.updateOne(
            { id: taskToUpdate.id }, 
            { $set: { completed: true } } 
          );
        } else {
          console.warn("Task at index", index, "does not have a valid name for update.");
        }
    } catch (error) {
      console.error('Error in setCompletedImpl:', error);
  }
};
}

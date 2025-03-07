import dotenv from 'dotenv';
dotenv.config();

import { betterAuth } from "better-auth";
import { MongoClient, ServerApiVersion } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

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

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {  
    enabled: true
},
});
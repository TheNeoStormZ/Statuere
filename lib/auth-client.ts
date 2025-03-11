import { createAuthClient } from "better-auth/react"
import { passkeyClient } from "better-auth/client/plugins";


import dotenv from 'dotenv';

const baseURL = process.env.BETTER_AUTH_URL;
dotenv.config();
export const authClient = createAuthClient({
    plugins: [
        passkeyClient(), 
      ], 
    baseURL: baseURL
})
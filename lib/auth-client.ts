import { createAuthClient } from "better-auth/react"

import dotenv from 'dotenv';

const baseURL = process.env.BETTER_AUTH_URL;
dotenv.config();
export const authClient = createAuthClient({
    baseURL: baseURL
})
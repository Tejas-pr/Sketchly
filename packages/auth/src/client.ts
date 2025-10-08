import { createAuthClient } from "better-auth/react";
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const nextjsHandler = toNextJsHandler(auth);

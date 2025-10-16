import { auth } from "@repo/auth/server";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

const allowedOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(",") ?? [];

function setCorsHeaders(origin: string | null, res: Response) {
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}

export async function OPTIONS(req: Request) {
  const res = new Response(null, { status: 200 });
  const origin = req.headers.get("origin");
  return setCorsHeaders(origin, res);
}

export async function GET(req: Request) {
  const res = await handlers.GET(req); // Better Auth reads the body if needed
  const origin = req.headers.get("origin");
  return setCorsHeaders(origin, res);
}

export async function POST(req: Request) {
  // Do NOT read req.body here
  const res = await handlers.POST(req); 
  const origin = req.headers.get("origin");
  return setCorsHeaders(origin, res);
}

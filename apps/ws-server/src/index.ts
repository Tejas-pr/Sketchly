import { prisma } from "@repo/db";
import { auth } from "@repo/auth";
import type { IncomingMessage } from "http";

async function call() {
  console.log(">>>>>>>>>>", await prisma.user.findFirst());
}
call();

export async function getSessionFromRequest(
  req: IncomingMessage,
  token: string
) {
  try {
    const session = await auth.api.getSession({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return session ?? null;
  } catch (err) {
    console.error("❌ Failed to get session:", err);
    return null;
  }
}

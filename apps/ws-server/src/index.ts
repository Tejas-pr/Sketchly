import { auth } from "@repo/auth/server";
import type { IncomingMessage } from "http";

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

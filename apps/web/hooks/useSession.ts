"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth";
import { SessionData } from "@/lib/types";
import { useLoader } from "@/providers/loader-provider";

export function useSession() {
  const [session, setSession] = useState<SessionData>(null);
  const { setLoading } = useLoader();

  useEffect(() => {
    async function fetchSession() {
      try {
        const result = await authClient.getSession();
        if ("data" in result) {
          setSession(result.data ?? null);
        } else {
          console.error("Session error:", result);
          setSession(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { session, user: session?.user };
}

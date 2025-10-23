"use client";

import { UseSocketResult } from "@/lib/interfaces";
import { useLoader } from "@/providers/loader-provider";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@workspace/ui/components/sonner";
import { getRoomIdBySlug } from "@/app/actions/room";
import { getUserSession } from "@/app/api/auth/session";

export function useSocket(roomId: string | null | undefined): UseSocketResult {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { setLoading } = useLoader();
  const router = useRouter();

  useEffect(() => {
    if (!roomId || socketRef.current) {
      setLoading(false);
      return;
    }

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.error("❌ No WebSocket URL provided!");
      setError("No WebSocket URL provided");
      setLoading(false);
      toast.error("No WebSocket URL provided");
      router.push("/");
      return;
    }

    let isMounted = true;

    const initSocket = async () => {
      setLoading(true);
      setError(null);

      try {
        const resolvedRoomId = await getRoomIdBySlug(roomId);
        if (resolvedRoomId === undefined) {
          toast("Unable to find the room id! Please try again.")
          return;
        }
        const room_number = resolvedRoomId.room_details?.id;
        const sessionData = await getUserSession();
        if (sessionData === null) {
          if (!isMounted) return;
          setLoading(false);
          toast.error("Invalid user please log in!!");
          router.push("/");
          return;
        }
        if ('error' in sessionData) {
          toast.error(sessionData.error);
          throw new Error(sessionData.error);
        }
        const userId = sessionData.session.userId;
        const socket = new WebSocket(`${wsUrl}?userId=${userId}`);
        socketRef.current = socket;

        socket.onopen = () => {
          if (!isMounted) return;
          setIsConnected(true);
          setLoading(false);

          socket.send(JSON.stringify({
            type: "join_room",
            roomId: room_number
          }));

          toast.success(`Joined room ${roomId}`);
        };

        socket.onerror = (err) => {
          if (!isMounted) return;
          console.error("WebSocket error:", err);
          setError("Failed to connect");
          setLoading(false);
          toast.error("WebSocket connection failed");
          router.push("/");
        };

        socket.onclose = () => {
          if (!isMounted) return;
          setIsConnected(false);
        };
      } catch (err: any) {
        console.error(err);
        if (!isMounted) return;
        setError(err.message || "Unknown error");
        setLoading(false);
        toast.error("Failed to connect to the room");
        router.push("/");
      }
    };

    initSocket();

    return () => {
      isMounted = false;
      socketRef.current?.close();
    };
  }, [roomId, router, setLoading]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
}

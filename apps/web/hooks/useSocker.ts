"use client";

import { UseSocketResult } from "@/lib/interfaces";
import { useLoader } from "@/providers/loader-provider";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@workspace/ui/components/sonner";
import { getRoomIdBySlug } from "@/app/actions/room";
import { getUserSession } from "@/app/api/auth/session";

export const useSocket = (roomId?: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shapes, setShapes] = useState<any>();
  const { setLoading } = useLoader();

  const router = useRouter();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isMounted = true;
    let connectionTimeout: NodeJS.Timeout;

    const init = async () => {
      const session = await getUserSession();
      if (!session) {
        setLoading(false);
        toast("Please login to use live collaboration", {
          description: "Redirecting to log in page"
        });
        router.push("/login");
        return;
      }

      if (!roomId) {
        setLoading(false);
        return;
      }

      const resolvedRoom = await getRoomIdBySlug(roomId);
      const room_number = resolvedRoom?.room_details?.id;

      if (!room_number) {
        toast("Invalid room! Redirecting...");
        router.push("/");
        return;
      }

      const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
      if (!wsUrl) {
        toast.error("WebSocket server URL not found!");
        setLoading(false);
        return;
      }

      if ('error' in session) {
        toast.error(session.error); throw new Error(session.error)
      }

      const socket = new WebSocket(`${wsUrl}?userId=${session.session.userId}`);
      socketRef.current = socket;

      connectionTimeout = setTimeout(() => {
        if (socket.readyState !== WebSocket.OPEN) {
          setError("Unable to connect to WebSocket");
          socket.close();
          setLoading(false);
          router.push("/");
        }
      }, 4000);

      socket.onopen = () => {
        clearTimeout(connectionTimeout);
        if (!isMounted) return;

        setIsConnected(true);
        setLoading(false);

        socket.send(
          JSON.stringify({
            type: "join_room",
            roomId: room_number
          })
        );

        toast.success(`Joined room ${roomId}`);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setShapes(data);

        } catch (err) {
          console.log("Non-JSON message:", event.data);
        }
      };

      socket.onerror = () => {
        clearTimeout(connectionTimeout);
        setError("WebSocket error");
        setLoading(false);
        setIsConnected(false);
        toast("Redirecting in 4s");
        setTimeout(() => {
          router.push("/");
        }, 4000);
      };

      socket.onclose = () => {
        clearTimeout(connectionTimeout);
        setIsConnected(false);
      };
    };

    init();

    return () => {
      isMounted = false;
      clearTimeout(connectionTimeout);
      socketRef.current?.close();
    };
  }, [roomId]);

  return {
    socket: socketRef.current,
    newshapes: shapes,
    isConnected,
    error
  };
};
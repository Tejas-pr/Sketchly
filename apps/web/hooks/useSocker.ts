"use client";

import { getRoomIdbySlug } from "@/app/actions/actions";
import { UseSocketResult } from "@/lib/interfaces";
import { useLoader } from "@/providers/loader-provider";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@workspace/ui/components/sonner";

export function useSocket(roomId: string | null | undefined): UseSocketResult {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { setLoading } = useLoader();
  const router = useRouter();

  useEffect(() => {
    if (!roomId || socketRef.current) {
      setLoading(false);
      toast.error("No room provided");
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
        const resolvedRoomId = await getRoomIdbySlug(roomId);

        if (!resolvedRoomId) {
          if (!isMounted) return;
          setLoading(false);
          toast.error("Room does not exist");
          router.push("/");
          return;
        }

        const socket = new WebSocket(`${wsUrl}?roomId=${resolvedRoomId}`);
        socketRef.current = socket;

        socket.onopen = () => {
          if (!isMounted) return;
          setIsConnected(true);
          setLoading(false);
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

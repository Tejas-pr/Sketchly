"use client";
import { UseSocketResult } from "@/lib/interfaces";
import { useLoader } from "@/providers/loader-provider";
import { useEffect, useRef, useState } from "react";

export function useSocket(roomId: string | undefined | null): UseSocketResult {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { setLoading } = useLoader();

  useEffect(() => {
    if(!roomId || roomId == undefined) {
      return;
    }
    // fallback to env if not passed
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    if (!wsUrl) {
      console.error("❌ No WebSocket URL provided!");
      setError("No WebSocket URL provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      setLoading(false);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Failed to connect");
      setLoading(false);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
}

"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Users } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/components/sonner";
import { createRoom } from "@/app/actions/room";
import { Spinner } from "@workspace/ui/components/ui/shadcn-io/spinner";
import { getUserSession } from "@/app/api/auth/session";
import { usePopup } from "@/providers/popup-provider";

export function LiveCollaboration() {
  const [roomName, setRoomName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [canCopy, setCanCopy] = useState<boolean>(false);
  const { openPopup } = usePopup();

  const baseUrl = useMemo(() => {
    const envUrl = process.env.NEXT_PUBLIC_FE_URL;
    if (envUrl) return envUrl;
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  }, []);

  const link = roomName ? `${baseUrl}/canvas/${roomName}` : "";

  const handleCopy = () => {
    if (!roomName) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const create_room = async (room: string) => {
    const session = await getUserSession();
    setLoading(true);
    if (!session) {
      setLoading(false);
      toast(
        "✨ Please log in or sign up to access real-time collaboration features!"
      );
      openPopup("login");
      return;
    }
    try {
      const room_deatils = await createRoom(room);
      if (room_deatils?.success) {
        setLoading(false);
        setCanCopy(true);
        toast.success(room_deatils.message);
      } else {
        setLoading(false);
        setCanCopy(false);
        toast.warning(room_deatils?.message);
      }
    } catch (e) {
      setLoading(false);
      setCanCopy(false);
      console.error(e);
      toast.error("Fail to create room!!");
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto p-4 transition-colors",
        "bg-white text-gray-900 border-gray-200",
        "dark:bg-[#1c1c1f] dark:text-gray-100 dark:border-gray-700"
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Live Collaboration
          </h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Invite others to collaborate on your drawing in real time. Sessions
          are end-to-end encrypted and fully private.
        </p>

        {/* Input Field */}
        <div className="mt-4 space-y-2">
          <label
            htmlFor="room"
            className="text-sm font-medium text-muted-foreground"
          >
            Room Name
          </label>
          <Input
            id="room"
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Link Preview */}
        {roomName && (
          <div className="mt-4 rounded-lg border px-4 py-3 text-sm bg-muted/50 border-muted-foreground/20">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Share this link
            </p>
            <p className="font-mono text-sm break-all">{link}</p>
          </div>
        )}

        <div>
          <Button
            onClick={() => create_room(roomName)}
            disabled={!roomName}
            className="w-full h-12 mt-4 inline-flex items-center justify-center gap-2 text-base"
          >
            {loading ? <Spinner /> : "Create Room"}
          </Button>
          <Button
            onClick={handleCopy}
            disabled={!roomName || !canCopy}
            className="w-full h-12 mt-4 inline-flex items-center justify-center gap-2 text-base"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" />
                Link Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

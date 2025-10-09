import { useState, useMemo } from "react";
import { Copy, Check, Users } from "lucide-react";

export function LiveCollaboration() {
  const [roomName, setRoomName] = useState("");
  const [copied, setCopied] = useState(false);

  const baseUrl = useMemo(() => {
    const envUrl = process.env.VITE_PUBLIC_FE_URL;
    if (envUrl) return envUrl;

    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  }, []);

  const link = roomName ? `${baseUrl}/canvas/${roomName}` : '';

  const handleCopy = () => {
    if (!roomName) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-lg">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full ">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Live Collaboration
            </h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mt-2">
            Invite people to collaborate on your drawing. Sessions are end-to-end encrypted and fully private.
          </p>
        </div>

        <div className="px-8 py-3 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="room"
              className="text-sm font-medium text-slate-200 block"
            >
              Room Name
            </label>
            <input
              id="room"
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex h-12 w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-base text-white ring-offset-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            />
          </div>

          {roomName && (
            <div className="rounded-md bg-slate-800 border border-slate-700 px-4 py-3">
              <p className="text-xs font-medium text-slate-400 mb-1">
                Share this link
              </p>
              <p className="text-sm text-slate-200 font-mono break-all">
                {link}
              </p>
            </div>
          )}

          <button
            onClick={handleCopy}
            disabled={!roomName}
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50"
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
          </button>
        </div>
      </div>
    </div>
  );
}

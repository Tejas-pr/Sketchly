"use client";

import { useSession } from "@/hooks/useSession";
import { generateShape } from "@/lib/ai/langchain";
import { requestLogin, thinkingMessage, thinkingMessageFail } from "@/lib/toast/message";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/components/sonner";
import { Bot, SendHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Spinner } from "@workspace/ui/components/ui/shadcn-io/spinner";
import { usePopup } from "@/providers/popup-provider";
import { AIProps } from "@/lib/types";

export function AI({ onShapeCreated }: AIProps) {
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const { openPopup } = usePopup();
  const { session, user } = useSession();
  const { theme } = useTheme();

  const getAiShapes = async (prompt: string) => {
    toast(thinkingMessage);
    setSubmit(true);

    if (!session || !user) {
      openPopup("login");
      setSubmit(false);
      toast.info(requestLogin);
      return;
    }

    try {
      const shape = await generateShape(prompt, theme);
      if (shape) onShapeCreated(shape);
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.dismiss(thinkingMessageFail);
    } finally {
      setMessage("");
      setSubmit(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-2 sm:px-0">
      {/* Gradient animation styles */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative flex items-center w-full">
        {/* Gradient border */}
        <div
          className="relative w-full rounded-xl p-[2px]"
          style={{
            background: "linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)",
            backgroundSize: "200% 200%",
            animation: "gradientMove 4s linear infinite",
          }}
        >
          {/* Input Container */}
          <div className="relative flex items-center bg-background rounded-[11px]">
            {/* Bot icon */}
            <Bot className="absolute left-3 text-muted-foreground w-5 h-5 z-10 pointer-events-none" />

            {/* Input field */}
            <input
              type="text"
              value={message}
              onKeyUpCapture={(e) => e.key === "Enter" && getAiShapes(message)}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask AI to draw something..."
              className="w-full pl-10 pr-12 py-2 text-sm sm:text-base bg-transparent border-0 rounded-[11px]
                         text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0
                         transition-all duration-200"
            />

            {/* Send button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 h-8 w-8 sm:h-9 sm:w-9 text-muted-foreground hover:text-foreground z-10"
              onClick={() => getAiShapes(message)}
            >
              {submit ? (
                <Spinner className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <SendHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile-only helper text */}
      <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-1 sm:mt-2 block sm:hidden">
        Try typing: “Draw a blue triangle with stroke 3”
      </p>
    </div>
  );
}

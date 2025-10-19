"use client";

import { useSession } from "@/hooks/useSession";
import { generateShape } from "@/lib/ai/langchain";
import { AIProps, Shape } from "@/lib/types";
import { Button } from "@workspace/ui/components/button";
import { toast } from "@workspace/ui/components/sonner";
import { Bot, SendHorizontal, Square } from "lucide-react";
import { useTheme } from "next-themes";
import { JSX, useState } from "react";

export function AI({ onShapeCreated }: AIProps): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const { session, user } = useSession();
  const { theme } = useTheme();
  
  const getAiShapes = async (prompt: string) => {
    setSubmit(true);

    if (!session || !user) {
      setSubmit(false);
      toast("Please log in to use this feature");
      return;
    }

    try {
      const shape = await generateShape(prompt, theme);
      console.log("Generated shape:", shape);
      
      if (shape) {
        onShapeCreated(shape);
      }
    } catch (error) {
      console.error("AI generation failed:", error);
      toast("Failed to generate shape");
    } finally {
      setMessage("");
      setSubmit(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Gradient animation styles */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative flex items-center">
        {/* Gradient border wrapper */}
        <div
          className="relative w-full rounded-xl p-[2px]"
          style={{
            background: "linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)",
            backgroundSize: "200% 200%",
            animation: "gradientMove 4s linear infinite",
          }}
        >
          {/* Input container */}
          <div className="relative flex items-center bg-background rounded-[11px]">
            {/* Bot icon */}
            <Bot className="absolute left-3 text-muted-foreground w-5 h-5 z-10 pointer-events-none" />

            {/* Input */}
            <input
              type="text"
              value={message}
              onKeyUpCapture={(e) => {
                if (e.key === "Enter") {
                  getAiShapes(message);
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              placeholder="Ask AI to draw something..."
              className="w-full pl-10 pr-12 py-2 text-sm bg-transparent border-0 rounded-[11px] 
                         text-foreground placeholder:text-muted-foreground 
                         focus:outline-none focus:ring-0"
            />

            {/* Send / Stop button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 h-8 w-8 text-muted-foreground hover:text-foreground z-10"
              onClick={() => getAiShapes(message)}
            >
              {submit ? <Square className="w-4 h-4" /> : <SendHorizontal className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

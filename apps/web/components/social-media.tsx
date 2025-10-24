"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Github, Linkedin } from "lucide-react";

const social = [
  {
    name: "GitHub",
    link: "https://github.com/Tejas-pr/Sketchly.git",
    icon: Github,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/tejas-p-r-057a4622a/",
    icon: Linkedin,
  },
];

export function SocialMedia() {
  return (
    <div className="flex gap-2">
      {social.map((item, i) => {
        const Icon = item.icon;
        return (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <button
                className="px-3 py-2 flex items-center justify-center rounded-md border-2 transition hover:cursor-pointer hover:bg-muted"
                onClick={() => window.open(item.link, "_blank")}
                aria-label={item.name}
              >
                <Icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {item.name}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

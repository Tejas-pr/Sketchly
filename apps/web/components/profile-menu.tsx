"use client";

import { useSession } from "@/hooks/useSession";
import { cn } from "@workspace/ui/lib/utils";
import { User } from "lucide-react";

export function ProfileMenu() {
  const { user } = useSession();

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-white dark:bg-neutral-900",
        "border border-neutral-200 dark:border-neutral-700",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "transition-colors cursor-pointer select-none"
      )}
    >
      <User className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Hi {user?.name ?? "Guest"}
      </span>
    </div>
  );
}

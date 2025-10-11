"use client";

import { useSession } from "@/hooks/useSession";
import { User } from "lucide-react";

export function ProfileMenu() {
  const { user } = useSession();

  return (
    <div className="flex items-center space-x-2 border rounded-md p-1 dark:border-gray-600 bg-white dark:bg-gray-800">
      <User className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      <span className="text-gray-800 dark:text-gray-200 font-medium">
        Hi {user?.name ?? "Guest"}
      </span>
    </div>
  );
}

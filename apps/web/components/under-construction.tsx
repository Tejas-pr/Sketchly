"use client";

import { Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

export function UnderConstruction() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent text-center select-none">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-lg max-w-md animate-fade-in">
        <div className="flex items-center gap-3">
          {/* 👇 replaced spin with shake */}
          <Wrench className="w-8 h-8 text-orange-500 animate-shake" />
          <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
            Feature in Progress
          </h1>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          We’re still building this feature — it’ll be available soon!
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-2 px-4 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

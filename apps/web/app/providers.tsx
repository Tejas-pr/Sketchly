"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import { LoaderProvider } from "@/providers/loader-provider";
import { Toaster } from "@workspace/ui/components/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LoaderProvider>
        {children}
        <Toaster />
      </LoaderProvider>
    </ThemeProvider>
  );
}

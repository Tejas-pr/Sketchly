"use client";

import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import { LoaderProvider } from "@/providers/loader-provider";
import { Toaster } from "@workspace/ui/components/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
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

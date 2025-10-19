"use client";
import { Spinner } from "@workspace/ui/components/ui/shadcn-io/spinner";
import { createContext, ReactNode, useContext, useState } from "react";

type LoaderContextType = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}

      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-opacity duration-200">
          <Spinner
            variant="bars"
            size="25"
            className="text-gray-800 dark:text-gray-100"
          />
          {/* <p className="text-gray-800 dark:text-gray-200 text-sm font-medium animate-pulse">
            Loading...
          </p> */}
        </div>
      )}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context)
    throw new Error("useLoader must be used inside a LoaderProvider");
  return context;
}
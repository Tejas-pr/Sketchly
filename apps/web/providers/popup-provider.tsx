import { PopupContextValue } from "@/lib/interfaces";
import { PopupType } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [popupType, setPopupType] = useState<PopupType>(null);

  const openPopup = (type: Exclude<PopupType, null>) => setPopupType(type);
  const closePopup = () => setPopupType(null);

  return (
    <PopupContext.Provider value={{ popupType, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
}

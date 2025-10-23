import { PopupType, Shape } from "./types";

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface CanvasProps {
  roomId?: string;
}

export interface UseSocketResult {
  socket: WebSocket | null;
  isConnected: boolean;
  error: string | null;
  newshapes: any;
}

export interface LoginFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

export interface DropdownmenuProps {
  onResetCanvas: () => void
}

export interface PopupContextValue {
  popupType: PopupType;
  openPopup: (type: Exclude<PopupType, null>) => void;
  closePopup: () => void;
}
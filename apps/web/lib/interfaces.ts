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
}

export interface LoginFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

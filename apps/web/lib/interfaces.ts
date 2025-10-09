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
  isLoading: boolean;
  error: string | null;
}
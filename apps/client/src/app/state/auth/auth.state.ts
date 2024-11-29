interface User {
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null; // Timestamp for auto logout
  isAuthenticated: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  error: null,
};

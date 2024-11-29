export interface AuthPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

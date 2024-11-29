import { createAction, props } from '@ngrx/store';

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string; password: string }>()
);
export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);
export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<{
    token: string;
    user: { name: string; email: string };
    expiresAt: number;
  }>()
);
export const logout = createAction('[Auth] Logout');
export const autoLogout = createAction('[Auth] Auto Logout');
export const authError = createAction(
  '[Auth] Auth Error',
  props<{ error: string }>()
);

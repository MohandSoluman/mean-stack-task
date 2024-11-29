import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.authSuccess, (state, { token, user, expiresAt }) => ({
    ...state,
    user: {
      name: user.name,
      email: user.email,
    },
    token,
    expiresAt,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.authError, (state, { error }) => ({
    ...state,
    error,
  }))
);

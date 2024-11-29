// src/app/state/auth/auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectExpiresAt = createSelector(
  selectAuthState,
  (state) => state.expiresAt
);
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

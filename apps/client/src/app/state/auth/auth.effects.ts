import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../routes/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions, // Handles dispatched actions
    private authService: AuthService, // Communicates with the backend
    private router: Router // Manages navigation
  ) {}

  /**
   * Signup Effect
   * Handles user registration by calling the AuthService.signup method.
   */
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart), // Triggered by signupStart action
      switchMap(({ email, password }) =>
        this.authService.signup({ email, password }).pipe(
          map((response) => {
            const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8-hour expiration
            return AuthActions.authSuccess({
              token: response.token,
              user: response.user,
              expiresAt,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.authError({
                error: error.error?.message || 'Signup failed',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Login Effect
   * Handles user login by calling the AuthService.login method.
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart), // Triggered by loginStart action
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => {
            const { token, user, expiresAt } = response;
            return AuthActions.authSuccess({
              token,
              user,
              expiresAt,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.authError({
                error: error.error?.message || 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Auto Logout Effect
   * Automatically logs out the user after the token expires.
   */
  autoLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess), // Triggered by authSuccess action
        tap(({ expiresAt }) => {
          const duration = expiresAt - Date.now(); // Calculate time remaining
          setTimeout(() => {
            localStorage.clear(); // Clear session storage
            this.router.navigate(['/login']); // Navigate to login page
          }, duration);
        })
      ),
    { dispatch: false } // No new actions are dispatched
  );

  /**
   * Logout Effect
   * Handles user logout by clearing session and navigating to login.
   */
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout), // Triggered by logout action
        tap(() => {
          localStorage.clear(); // Clear session data
          this.router.navigate(['/login']); // Redirect to login page
        })
      ),
    { dispatch: false } // No new actions are dispatched
  );
}

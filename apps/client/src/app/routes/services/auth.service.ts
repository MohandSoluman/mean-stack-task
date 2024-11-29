// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  user: { name: string; email: string };
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://your-backend-api.com/auth'; // Replace with your backend URL
  private user: { name: string; email: string } | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Sign up a new user
   * @param data - Contains email and password
   * @returns Observable of AuthResponse
   */
  signup(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data);
  }

  /**
   * Log in an existing user
   * @param data - Contains email and password
   * @returns Observable of AuthResponse
   */
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  /**
   * Store user information and token
   * @param token - JWT token
   * @param user - User details (name and email)
   */
  setAuthData(token: string, user: { name: string; email: string }): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  /**
   * Retrieve user information
   * @returns User details or null if not logged in
   */
  getUser(): { name: string; email: string } | null {
    if (!this.user) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    }
    return this.user;
  }

  /**
   * Retrieve JWT token
   * @returns JWT token or null if not logged in
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Clear user information and token
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.user = null;
  }
}

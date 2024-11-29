import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private readonly apiUrl = 'https://your-backend-api.com/users'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Helper method to add the Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('jwtToken'); // JWT is stored in sessionStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Get all users from the backend.
   * @returns An Observable of an array of users.
   */
  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Get a single user by ID from the backend.
   * @param id The ID of the user to fetch.
   * @returns An Observable of the user.
   */
  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Add a new user to the backend.
   * @param newUser The user data to add.
   * @returns An Observable of the newly created user.
   */
  public addUser(newUser: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, newUser, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Update an existing user by ID in the backend.
   * @param id The ID of the user to update.
   * @param updatedUser The updated user data.
   * @returns An Observable of the updated user.
   */
  public updateUser(id: string, updatedUser: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, updatedUser, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Delete a user by ID from the backend.
   * @param id The ID of the user to delete.
   * @returns An Observable of the delete operation.
   */
  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

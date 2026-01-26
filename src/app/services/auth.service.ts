import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/performance.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  registerUser(email: string, password: string, login: string, firstName: string, lastName: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/register`, {
      email, password, login, firstName, lastName
    });
  }

  loginUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, {
      email, password
    });
  }

  logoutUser(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, { userId });
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, email: string, password: string, data: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, {
      email, password, ...data
    });
  }
}

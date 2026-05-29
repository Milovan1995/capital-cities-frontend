import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../components/models/user';
import { UserProfile } from '../components/models/userProfile';
import { UserStats } from '../components/models/userStats';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  login(user: User) {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  getCurrentUser() {
    return this.http.get<{ user: UserProfile }>(`${environment.API_URL}/user/me`, {
      headers: this.getAuthHeaders(),
    });
  }

  getCurrentUserStats() {
    return this.http.get<{ stats: UserStats }>(
      `${environment.API_URL}/user/me/stats`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  isLoggedIn() {
    const token = localStorage.getItem('capitals-token');
    return !!token;
  }

  getUserData() {
    const token = localStorage.getItem('capitals-token');
    if (!token) return null;
    const tokenParts = token.split('.');
    const userDataPart = tokenParts[1];
    const user = JSON.parse(window.atob(userDataPart));
    return user;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('capitals-token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/models/user';
import { UserProfile } from '../components/models/userProfile';
import { UserStats } from '../components/models/userStats';

export interface AuthTokenPayload {
  userId: number;
  username?: string;
  isAdmin?: boolean;
  exp?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly tokenStorageKey = 'capitals-token';
  authUrl = `${environment.API_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  login(user: User) {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  getCurrentUser() {
    return this.http.get<{ user: UserProfile }>(`${environment.API_URL}/user/me`);
  }

  getCurrentUserStats() {
    return this.http.get<{ stats: UserStats }>(
      `${environment.API_URL}/user/me/stats`
    );
  }

  isLoggedIn() {
    return this.getUserData() !== null;
  }

  getUserData(): AuthTokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3 || !tokenParts[1]) {
        throw new Error('Invalid token structure');
      }

      const user = JSON.parse(this.decodeBase64Url(tokenParts[1])) as Partial<
        AuthTokenPayload
      >;
      if (!user || typeof user !== 'object' || typeof user.userId !== 'number') {
        throw new Error('Invalid token payload');
      }

      if (typeof user['exp'] === 'number' && user['exp'] * 1000 <= Date.now()) {
        throw new Error('Token expired');
      }

      return user as AuthTokenPayload;
    } catch {
      this.clearSession();
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.tokenStorageKey);
  }

  clearSession(): void {
    localStorage.removeItem(AuthService.tokenStorageKey);
  }

  logout(): void {
    this.clearSession();
  }

  private decodeBase64Url(value: string): string {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    return window.atob(padded);
  }
}

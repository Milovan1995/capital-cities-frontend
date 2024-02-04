import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/models/user';

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
}

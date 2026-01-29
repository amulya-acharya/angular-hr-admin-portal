import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

type LoginResponse = { token: string };

interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Use your real API later; for quick demo you can use DummyJSON /auth/login
    // Docs: https://dummyjson.com/docs/auth
    return this.http.post<LoginResponse>('https://dummyjson.com/auth/login', credentials).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  logout(): void {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

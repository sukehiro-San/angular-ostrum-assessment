import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);
  isLoggedIn = this._isLoggedIn.asReadonly();
  private _baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http.post(this._baseUrl + '/api/auth/login', { username, password }).subscribe({
      next: () => {
        this._isLoggedIn.set(true);
        this.router.navigate(['/products']);
      },
      error: () => alert('Login failed'),
    });
  }

  logout() {
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}

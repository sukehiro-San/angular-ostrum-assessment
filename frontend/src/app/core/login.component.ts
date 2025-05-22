import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-form-container">
      <h2>Login</h2>
      <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
        <input
          [(ngModel)]="username"
          name="username"
          placeholder="Username"
          required
          minlength="3"
          #usernameCtrl="ngModel"
        />
        <div class="error" *ngIf="usernameCtrl.invalid && (usernameCtrl.dirty || usernameCtrl.touched)">
          <span *ngIf="usernameCtrl.errors?.['required']">Username is required.</span>
          <span *ngIf="usernameCtrl.errors?.['minlength']">Username must be at least 3 characters.</span>
        </div>

        <input
          [(ngModel)]="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          minlength="6"
          #passwordCtrl="ngModel"
        />
        <div class="error" *ngIf="passwordCtrl.invalid && (passwordCtrl.dirty || passwordCtrl.touched)">
          <span *ngIf="passwordCtrl.errors?.['required']">Password is required.</span>
          <span *ngIf="passwordCtrl.errors?.['minlength']">Password must be at least 6 characters.</span>
        </div>

        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .login-form-container {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.10);
      padding: 2.5rem 2rem 1.5rem 2rem;
      margin: 2rem auto;
      min-width: 320px;
      max-width: 90vw;
      width: 320px;
      animation: popup-in 0.25s cubic-bezier(.23,1.01,.32,1) both;
    }
    @keyframes popup-in {
      from { transform: translateY(40px) scale(0.96); opacity: 0; }
      to   { transform: translateY(0) scale(1); opacity: 1; }
    }
    .login-form-container h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      color: #222;
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .login-form-container form {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
    }
    .login-form-container input {
      padding: 0.75rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      background: #f7f7f7;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
    }
    .login-form-container input:focus {
      border-color: #4f8cff;
      box-shadow: 0 0 0 2px rgba(79,140,255,0.10);
    }
    .login-form-container button[type='submit'] {
      background: #4f8cff;
      color: #fff;
      border: none;
      padding: 0.8rem 1.6rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(79,140,255,0.08);
    }
    .login-form-container button[type='submit']:hover,
    .login-form-container button[type='submit']:focus {
      background: #2563eb;
    }
    .error {
      color: #ef4444;
      font-size: 0.98rem;
      margin-top: -0.7rem;
      margin-bottom: 0.2rem;
      padding-left: 2px;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  login(form: NgForm) {
    if (form.valid) {
      this.auth.login(this.username, this.password);
    }
  }
}

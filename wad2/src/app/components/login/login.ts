import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  message = '';
  isError = false;
  isSubmitting = false;

  readonly loginForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.message = '';
    this.isError = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.message = 'Please enter valid login details.';
      this.isError = true;
      return;
    }

    this.isSubmitting = true;
    const value = this.loginForm.getRawValue();
    const result = this.userService.login({
      email: value.email ?? '',
      password: value.password ?? '',
      rememberMe: !!value.rememberMe
    });

    this.message = result.message;
    this.isError = !result.success;
    this.isSubmitting = false;

    if (result.success) {
      this.router.navigate(['/profile']);
    }
  }

  onDemoLogin(): void {
    this.loginForm.patchValue({
      email: 'demo@auth.com',
      password: 'demo123',
      rememberMe: true
    });
    this.onLogin();
  }
}

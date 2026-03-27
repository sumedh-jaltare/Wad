import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserRequest, UserType } from '../../models/user.model';
import { UserService } from '../../services/user';

const passwordMatchValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  isSubmitting = false;
  message = '';
  isError = false;

  readonly userTypes: UserType[] = ['Student', 'Admin', 'User'];

  readonly registerForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
        dateOfBirth: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        userType: ['Student' as UserType, [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegister(): void {
    this.message = '';
    this.isError = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.message = 'Please fix form validation errors.';
      this.isError = true;
      return;
    }

    this.isSubmitting = true;

    const payload = this.registerForm.getRawValue() as RegisterUserRequest & {
      confirmPassword: string;
    };

    const result = this.userService.register({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      phoneNumber: payload.phoneNumber,
      dateOfBirth: payload.dateOfBirth,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      userType: payload.userType
    });

    this.message = result.message;
    this.isError = !result.success;
    this.isSubmitting = false;

    if (result.success) {
      this.registerForm.reset({ userType: 'Student' });
      this.router.navigate(['/login']);
    }
  }

  onClear(): void {
    this.registerForm.reset({ userType: 'Student' });
    this.message = '';
    this.isError = false;
  }
}

export type UserType = 'Student' | 'Admin' | 'User';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  userType: UserType;
  status: 'Active' | 'Inactive';
  registeredDate: string;
}

export interface RegisterUserRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  userType: UserType;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}
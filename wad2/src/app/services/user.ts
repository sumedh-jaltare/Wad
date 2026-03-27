import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest, RegisterUserRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersKey = 'uas_users';
  private readonly currentUserKey = 'uas_current_user';
  private readonly sessionUserKey = 'uas_session_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.seedDemoUser();
  }

  private getUserFromStorage(): User | null {
    const local = localStorage.getItem(this.currentUserKey);
    const session = sessionStorage.getItem(this.sessionUserKey);
    const stored = local ?? session;
    return stored ? (JSON.parse(stored) as User) : null;
  }

  private setCurrentUserStorage(user: User | null, rememberMe: boolean): void {
    if (!user) {
      localStorage.removeItem(this.currentUserKey);
      sessionStorage.removeItem(this.sessionUserKey);
      return;
    }

    if (rememberMe) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      sessionStorage.removeItem(this.sessionUserKey);
      return;
    }

    sessionStorage.setItem(this.sessionUserKey, JSON.stringify(user));
    localStorage.removeItem(this.currentUserKey);
  }

  getUsers(): User[] {
    const stored = localStorage.getItem(this.usersKey);
    return stored ? (JSON.parse(stored) as User[]) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private seedDemoUser(): void {
    const users = this.getUsers();
    const demoExists = users.some((u) => u.email === 'demo@auth.com');
    if (demoExists) {
      return;
    }

    const demoUser: User = {
      id: Date.now(),
      fullName: 'Demo User',
      email: 'demo@auth.com',
      password: 'demo123',
      phoneNumber: '9999999999',
      dateOfBirth: '2000-01-01',
      address: 'Demo Street',
      city: 'Demo City',
      country: 'Demo Country',
      userType: 'User',
      status: 'Active',
      registeredDate: new Date().toISOString()
    };

    users.push(demoUser);
    this.saveUsers(users);
  }

  register(payload: RegisterUserRequest): { success: boolean; message: string } {
    const users = this.getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === payload.email.toLowerCase());

    if (exists) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser: User = {
      id: Date.now(),
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      password: payload.password,
      phoneNumber: payload.phoneNumber,
      dateOfBirth: payload.dateOfBirth,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      userType: payload.userType,
      status: 'Active',
      registeredDate: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Registration successful.' };
  }

  login(payload: LoginRequest): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === payload.email.toLowerCase() && u.password === payload.password
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }

    this.setCurrentUserStorage(user, payload.rememberMe);
    this.currentUserSubject.next(user);
    return { success: true, message: 'Login successful.' };
  }

  logout(): void {
    this.setCurrentUserStorage(null, false);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  updateProfile(payload: Partial<Pick<User, 'fullName' | 'phoneNumber' | 'address' | 'city' | 'country'>>): boolean {
    const current = this.getCurrentUser();
    if (!current) {
      return false;
    }

    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.id === current.id);
    if (userIndex === -1) {
      return false;
    }

    users[userIndex] = { ...users[userIndex], ...payload };
    this.saveUsers(users);

    const currentLocal = localStorage.getItem(this.currentUserKey);
    this.setCurrentUserStorage(users[userIndex], !!currentLocal);
    this.currentUserSubject.next(users[userIndex]);
    return true;
  }

  deleteCurrentUser(): boolean {
    const current = this.getCurrentUser();
    if (!current) {
      return false;
    }

    const users = this.getUsers().filter((u) => u.id !== current.id);
    this.saveUsers(users);
    this.logout();
    return true;
  }

  getTotalUsersCount(): number {
    return this.getUsers().length;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  totalUsersCount = 0;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get initials(): string {
    if (!this.user?.fullName) {
      return 'NA';
    }

    return this.user.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onEditProfile(): void {
    if (!this.user) {
      return;
    }

    const updated = this.userService.updateProfile({
      fullName: `${this.user.fullName}`,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      city: this.user.city,
      country: this.user.country
    });

    if (updated) {
      this.loadData();
    }
  }

  onDeleteAccount(): void {
    const confirmed = confirm('Delete your account permanently?');
    if (!confirmed) {
      return;
    }

    const deleted = this.userService.deleteCurrentUser();
    if (deleted) {
      this.router.navigate(['/register']);
    }
  }

  private loadData(): void {
    this.user = this.userService.getCurrentUser();
    this.totalUsersCount = this.userService.getTotalUsersCount();
  }
}

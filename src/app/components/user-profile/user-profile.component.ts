import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../models/userProfile';
import { UserStats } from '../models/userStats';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user?: UserProfile;
  stats?: UserStats;
  errorMessage?: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: ({ user }) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error while loading current user', error);
        this.errorMessage = 'Unable to load your profile.';
      },
    });

    this.authService.getCurrentUserStats().subscribe({
      next: ({ stats }) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error while loading user stats', error);
        this.errorMessage = 'Unable to load your profile stats.';
      },
    });
  }
}

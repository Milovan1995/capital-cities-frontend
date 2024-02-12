import { Component, OnInit } from '@angular/core';
import { Link } from '../models/link';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  username: string;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.username = this.authService.getUserData().username;
  }
  buttonRoute: Link = new Link('Play', '/pages/user/play');
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/pages/highscores'),
    new Link('Feedback', '/pages/feedback'),
    new Link('Play', '/pages/user/play'),
  ];
}

import { Component } from '@angular/core';
import { Link } from '../../models/link';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  username: string = 'Milovan';
  buttonRoute: Link = new Link('Play', '/pages/user/play');
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/pages/highscores'),
    new Link('Feedback', '/pages/feedback'),
    new Link('Play', '/pages/user/play'),
  ];
}

import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/capitals/highscores'),
    new Link('Feedback', '/pages/user/feedback'),
    new Link('Play', '/capitals/play-game'),
  ];
}

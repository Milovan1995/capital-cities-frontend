import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent {
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/pages/highscores'),
    new Link('Feedback', '/pages/feedback'),
    new Link('Play', '/pages/game'),
  ];
}

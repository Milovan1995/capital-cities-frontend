import { Component } from '@angular/core';
import { Link } from '../../../models/link';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.css',
})
export class HighscoresComponent {
  highscores: string[] = ['skor 1', 'skor2'];
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/pages/highscores'),
    new Link('Feedback', '/pages/feedback'),
    new Link('Play', '/pages/user/play'),
  ];
}

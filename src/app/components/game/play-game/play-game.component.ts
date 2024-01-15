import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
  ];
}

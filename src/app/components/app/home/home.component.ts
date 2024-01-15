import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navbarItems: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
    new Link('Play Now', '/capitals/play-game'),
  ];
}

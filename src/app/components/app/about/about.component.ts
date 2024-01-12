import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  navbarItems: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/pages/user/play'),
  ];
}

import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrl: './capitals-list.component.css',
})
export class CapitalsListComponent {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play'),
  ];
}

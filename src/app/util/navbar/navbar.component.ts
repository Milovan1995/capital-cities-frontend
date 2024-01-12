import { Component, Input } from '@angular/core';
import { Link } from '../../components/models/link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() navbarItems: Link[];
}

import { Component, Input } from '@angular/core';
import { Link } from '../../components/models/link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() navbarItems: Link[];
  constructor(private router: Router) {}
  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
  partiallyContainsRoute(route: string): boolean {
    return this.router.url.includes(route);
  }
  linkWhenLoggedIn: Link = new Link('Logout', '/home');
  linkWhenLoggedOut: Link = new Link('Login', '/pages/login');
}

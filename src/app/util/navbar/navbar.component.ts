import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../components/models/link';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() navbarItems: Link[];
  isLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
  partiallyContainsRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
    window.location.href = '/home';
  }
}

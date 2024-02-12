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
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
  ];
  isLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    !this.isLoggedIn
      ? this.navbarLinks.push(new Link('Play Now', '/capitals/play-game'))
      : this.navbarLinks.push(
          new Link('Profile', '/pages/user'),
          new Link('Highscores', '/pages/highscores'),
          new Link('Feedback', '/pages/feedback'),
          new Link('Play', '/pages/user/play')
        );
  }

  logout() {
    localStorage.clear();
    this.navbarLinks = [
      new Link('About', '/about'),
      ,
      new Link('Explore', '/capitals'),
    ];
    this.ngOnInit();
  }
}

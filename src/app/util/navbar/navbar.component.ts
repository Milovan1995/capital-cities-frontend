import { Component, OnInit } from '@angular/core';
import { Link } from '../../components/models/link';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageOptions } from '../languages';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navbarLinks: Link[] = [
    new Link('about', '/about'),
    new Link('explore', '/capitals'),
  ];
  readonly themeOptions = this.themeService.themeOptions;
  language: LanguageOptions;
  isLoggedIn: boolean;
  constructor(
    private authService: AuthService,
    private _trans: TranslateService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.language = this._trans.currentLang as LanguageOptions;
    this.isLoggedIn = this.authService.isLoggedIn();
    !this.isLoggedIn
      ? (this.navbarLinks = [
          ...this.navbarLinks,
          new Link('play-now', '/capitals/play-game'),
        ])
      : (this.navbarLinks = [
          ...this.navbarLinks,
          new Link('profile', '/pages/user'),
          new Link('highscores', '/capitals/highscores'),
          new Link('feedback', '/pages/user/feedback'),
          new Link('play', '/capitals/play-game'),
        ]);
  }

  languages = {
    en: LanguageOptions.EN,
    me: LanguageOptions.MNE,
  };

  switchLanguage(language: LanguageOptions) {
    this._trans.use(language);
    this.language = language;
  }

  switchTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  logout() {
    localStorage.removeItem('capitals-token');
    this.navbarLinks = [
      new Link('about', '/about'),
      new Link('explore', '/capitals'),
    ];
    this.ngOnInit();
  }
}

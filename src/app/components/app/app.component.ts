import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageOptions } from '../../util/languages';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(LanguageOptions.EN);
    this.translate.currentLang = LanguageOptions.EN;
    this.themeService.currentTheme();
  }
}

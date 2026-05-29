import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authServiceSpy.isLoggedIn.and.returnValue(false);
    localStorage.setItem('front-capitals-theme', 'sunset');

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FormsModule, RouterTestingModule, TranslateModule.forRoot()],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    themeService = TestBed.inject(ThemeService);
    TestBed.inject(TranslateService).use('en');

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose theme options and switch theme', () => {
    expect(component.themeOptions.map(({ value }) => value)).toEqual([
      'aurora',
      'sunset',
      'midnight',
    ]);

    component.switchTheme('midnight');

    expect(themeService.currentTheme()).toBe('midnight');
  });

  it('should reflect the persisted theme in the select control', () => {
    const select: HTMLSelectElement =
      fixture.nativeElement.querySelector('#themePicker');

    expect(themeService.currentTheme()).toBe('sunset');
    expect(select.value).toBe('sunset');
  });
});

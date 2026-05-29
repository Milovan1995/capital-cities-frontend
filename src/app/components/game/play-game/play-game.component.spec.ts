import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PlayGameComponent } from './play-game.component';
import { CapitalService } from '../../../services/capital.service';
import { HighscoresService } from '../../../services/highscores.service';
import { AuthService } from '../../../services/auth.service';

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;

  beforeEach(async () => {
    const capitalServiceSpy = jasmine.createSpyObj('CapitalService', [
      'getAllCapitals',
    ]);
    const highscoresServiceSpy = jasmine.createSpyObj('HighscoresService', [
      'saveGameScore',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUserData',
      'isLoggedIn',
    ]);

    capitalServiceSpy.getAllCapitals.and.returnValue(of({ capitals: [] }));
    highscoresServiceSpy.saveGameScore.and.returnValue(of({}));
    authServiceSpy.getUserData.and.returnValue(null);
    authServiceSpy.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      declarations: [PlayGameComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: CapitalService, useValue: capitalServiceSpy },
        { provide: HighscoresService, useValue: highscoresServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map known region names to translation keys', () => {
    expect(component.getRegionTranslationKey('North and South America')).toBe(
      'regions.north-and-south-america'
    );
    expect(component.getRegionTranslationKey('Custom')).toBe('Custom');
  });
});

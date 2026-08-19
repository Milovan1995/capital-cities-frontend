import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PlayGameComponent } from './play-game.component';
import { CapitalService } from '../../../services/capital.service';
import { HighscoresService } from '../../../services/highscores.service';
import { AuthService } from '../../../services/auth.service';
import { Capital } from '../../models/capital';

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;
  let highscoresServiceSpy: jasmine.SpyObj<HighscoresService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const capitalServiceSpy = jasmine.createSpyObj('CapitalService', [
      'getAllCapitals',
    ]);
    highscoresServiceSpy = jasmine.createSpyObj('HighscoresService', [
      'saveGameScore',
    ]);
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUserData',
      'isLoggedIn',
    ]);

    capitalServiceSpy.getAllCapitals.and.returnValue(of({ capitals: [] }));
    highscoresServiceSpy.saveGameScore.and.returnValue(of('saved'));
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

  it('saves an authenticated World game without a region id', () => {
    authServiceSpy.getUserData.and.returnValue({ userId: 7 });
    component.gameSettings = {
      region: 'World',
      durationId: 30,
      timer: 0,
    };

    component.handleGameOver();

    expect(highscoresServiceSpy.saveGameScore).toHaveBeenCalledOnceWith(
      0,
      30,
      undefined
    );
    expect(component.scoreSaveState).toBe('saved');
  });

  it('only finalizes and saves a game once', () => {
    authServiceSpy.getUserData.and.returnValue({ userId: 7 });
    component.gameSettings = {
      region: 'Europe',
      regionId: 1,
      durationId: 30,
      timer: 0,
    };

    component.handleGameOver();
    component.handleGameOver();

    expect(highscoresServiceSpy.saveGameScore).toHaveBeenCalledTimes(1);
  });

  it('ignores answers after the game has finished', () => {
    component.isGameFinished = true;
    component.currentCapital = new Capital(1, 'France', 'Paris', 'Europe');

    component.handleAnswer(true);

    expect(component.score).toBe(0);
  });
});

import { Component, OnDestroy } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { Capital } from '../../models/capital';
import { GameSettings } from '../../models/gameSettings';
import { Subscription } from 'rxjs';
import { HighscoresService } from '../../../services/highscores.service';
import { AuthService } from '../../../services/auth.service';
import { CapitalsResponse } from '../../models/capitalsResponse';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent implements OnDestroy {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
  ];

  capitals: Capital[] = [];
  currentCapital?: Capital;
  score: number = 0;
  errorMessage?: string;
  gameOptionsPicked: boolean = false;
  isGameFinished: boolean = false;
  gameSettings?: GameSettings;
  isGameLoading = false;
  scoreSaveState: 'not-started' | 'pending' | 'saved' | 'failed' = 'not-started';
  private capitalSubscription?: Subscription;
  private countdownIntervalId?: ReturnType<typeof setInterval>;
  private gameRunId = 0;

  constructor(
    private capitalService: CapitalService,
    private highscoresService: HighscoresService,
    private authService: AuthService
  ) {}

  startGame(regionId?: number) {
    const runId = ++this.gameRunId;
    this.errorMessage = undefined;
    this.isGameFinished = false;
    this.isGameLoading = true;
    this.currentCapital = undefined;
    this.clearCountdown();
    this.capitalSubscription?.unsubscribe();
    this.capitalSubscription = this.capitalService
      .getAllCapitals(regionId)
      .subscribe({
        next: (capitalsResponse: CapitalsResponse) => {
          if (runId !== this.gameRunId) return;
          this.capitals = [...capitalsResponse.capitals];
        },
        error: (error) => {
          if (runId !== this.gameRunId) return;
          console.error('Error while loading capitals', error);
          this.isGameLoading = false;
          this.errorMessage = 'Unable to load capitals right now.';
        },
        complete: () => {
          if (runId !== this.gameRunId) return;
          this.isGameLoading = false;
          if (this.capitals.length === 0) {
            this.errorMessage = 'No capitals available for this game mode.';
            return;
          }
          this.startCountdown();
          this.loadCurrentCapital();
        },
      });
  }

  loadCurrentCapital() {
    if (this.isGameFinished || this.isGameLoading) {
      return;
    }

    if (this.capitals.length === 0) {
      this.handleGameOver();
      return;
    }

    const i = this.capitals.length - 1;
    const j: number = Math.floor(Math.random() * (i + 1));
    [this.capitals[i], this.capitals[j]] = [this.capitals[j], this.capitals[i]];
    this.currentCapital = this.capitals.pop();
  }

  startCountdown() {
    this.clearCountdown();
    const runId = this.gameRunId;
    this.countdownIntervalId = setInterval(() => {
      if (runId !== this.gameRunId) {
        this.clearCountdown();
        return;
      }
      if (!this.gameSettings) {
        this.clearCountdown();
        return;
      }

      if (this.gameSettings.timer <= 0 || this.capitals.length === 0) {
        this.clearCountdown();
        this.handleGameOver();
        return;
      }
      this.gameSettings.timer--;
    }, 1000);
  }

  handleGameOver() {
    if (this.isGameFinished) {
      return;
    }

    this.clearCountdown();
    this.isGameLoading = false;
    this.isGameFinished = true;
    this.currentCapital = undefined;

    const userData = this.authService.getUserData();
    if (
      !userData ||
      this.scoreSaveState === 'pending' ||
      this.scoreSaveState === 'saved' ||
      this.gameSettings?.durationId == null
    ) {
      return;
    }

    this.saveScore();
  }

  private saveScore() {
    if (!this.gameSettings?.durationId) return;

    this.scoreSaveState = 'pending';
    const runId = this.gameRunId;
    this.highscoresService
      .saveGameScore(
        this.score,
        this.gameSettings.durationId,
        this.gameSettings.regionId
      )
      .subscribe({
        next: () => {
          if (runId === this.gameRunId) this.scoreSaveState = 'saved';
        },
        error: (error) => {
          if (runId !== this.gameRunId) return;
          console.error('Error while saving game score', error);
          this.scoreSaveState = 'failed';
          this.errorMessage = 'Your score could not be saved.';
        },
      });
  }

  handleAnswer(isCorrect: boolean) {
    if (this.isGameFinished || this.isGameLoading || !this.currentCapital) {
      return;
    }
    isCorrect && this.score++;
    this.loadCurrentCapital();
  }

  retrySaveScore() {
    if (!this.isGameFinished || this.scoreSaveState !== 'failed') return;
    this.scoreSaveState = 'not-started';
    this.errorMessage = undefined;
    const userData = this.authService.getUserData();
    if (userData) this.saveScore();
  }

  onOptionsSelected(options: GameSettings) {
    this.score = 0;
    this.scoreSaveState = 'not-started';
    this.capitals = [];
    this.currentCapital = undefined;
    this.gameSettings = { ...options };
    this.gameOptionsPicked = true;
    this.startGame(options.region === 'World' ? undefined : options.regionId);
  }

  onRestartGame() {
    ++this.gameRunId;
    this.clearCountdown();
    this.capitalSubscription?.unsubscribe();
    this.gameOptionsPicked = false;
    this.isGameFinished = false;
    this.score = 0;
    this.capitals = [];
    this.currentCapital = undefined;
    this.gameSettings = undefined;
    this.errorMessage = undefined;
    this.scoreSaveState = 'not-started';
    this.isGameLoading = false;
  }

  ngOnDestroy(): void {
    ++this.gameRunId;
    this.clearCountdown();
    this.capitalSubscription?.unsubscribe();
  }

  getRegionTranslationKey(regionName: string): string {
    const regionKeyMap: Record<string, string> = {
      World: 'regions.world',
      Europe: 'regions.europe',
      Asia: 'regions.asia',
      Africa: 'regions.africa',
      Australia: 'regions.australia',
      'North and South America': 'regions.north-and-south-america',
      Oceania: 'regions.oceania',
    };

    return regionKeyMap[regionName] ?? regionName;
  }

  private clearCountdown() {
    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
      this.countdownIntervalId = undefined;
    }
  }
}

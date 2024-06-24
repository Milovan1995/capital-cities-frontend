import { Component, OnDestroy } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { CapitalsResponse } from '../../models/capitalsResponse';
import { Capital } from '../../models/capital';
import { CapitalCacheService } from '../../../services/capital-cache.service';
import { GameSettings } from '../../models/gameSettings';
import { Subscription } from 'rxjs';

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
  currentCapital: Capital;
  score: number = 0;
  errorMessage?: string;
  gameOptionsPicked: boolean = false;
  gameSettings: GameSettings;
  regionId: number = undefined;
  private capitalSubscription: Subscription;

  constructor(
    private capitalService: CapitalService,
    private capitalCacheService: CapitalCacheService
  ) {}

  startGame(rId?: number) {
    this.errorMessage = undefined;
    this.startCountdown();
    // if (this.capitals.length < 1) {
    //   this.loadCapitalsWithoutCache(rId);
    //   return;
    // }
    if (this.gameSettings.region !== 'World') {
      this.capitals = this.capitals.filter(
        (element) => element.region == this.gameSettings.region
      );
    }
    this.loadCurrentCapital();
  }
  //pick a random element from the array, put it on the last spot, pop.
  loadCurrentCapital() {
    let i = this.capitals.length - 1;
    if (i > 0) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this.capitals[i], this.capitals[j]] = [
        this.capitals[j],
        this.capitals[i],
      ];
    }

    this.currentCapital = this.capitals.pop();
  }

  startCountdown() {
    const intervalId = setInterval(() => {
      if (this.gameSettings.timer <= 0 || this.capitals.length === 0) {
        clearInterval(intervalId);
        this.handleGameOver();

        return;
      }
      this.gameSettings.timer--;
    }, 1000);
  }
  handleGameOver() {}

  handleAnswer(isCorrect: boolean) {
    isCorrect && this.score++;
    this.loadCurrentCapital();
  }

  // loadCapitalsWithoutCache(regionID?: number) {
  //   this.capitalSubscription = this.capitalService
  //     .getAllCapitals(regionID)
  //     .subscribe({
  //       next: (capitalsResponse: CapitalsResponse) => {
  //         this.capitals = [...capitalsResponse.capitals];
  //         if (!regionID) {
  //           this.capitalCacheService.setCapitalsInCache([...this.capitals]);
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error while loading capitals', error);
  //         this.errorMessage = 'Apologies,maintenence';
  //       },
  //       complete: () => {
  //         this.loadCurrentCapital();
  //       },
  //     });
  // }

  // onOptionsSelected(options: GameSettings) {
  //   const capitalsCache = this.capitalCacheService.getCapitalsFromCache();
  //   this.capitals = Array.isArray(capitalsCache) ? [...capitalsCache] : [];
  //   this.gameSettings = options;
  //   this.gameOptionsPicked = true;
  //   if (this.gameSettings.region !== 'World') {
  //     this.regionId = this.getRegionId(this.gameSettings.region);
  //     return this.startGame(this.regionId);
  //   }
  //   this.startGame();
  // }
  onRestartGame() {
    this.gameOptionsPicked = false;
    this.score = 0;
  }

  getRegionId(region: string) {
    switch (region) {
      case 'Europe':
        return 1;
      case 'Africa':
        return 2;
      case 'Asia':
        return 3;
      case 'Oceania':
        return 4;
      default:
        return 5;
    }
  }

  ngOnDestroy(): void {
    if (this.capitalSubscription) this.capitalSubscription.unsubscribe();
  }
}

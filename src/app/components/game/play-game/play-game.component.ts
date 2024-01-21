import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { CapitalsResponse } from '../../models/capitalsResponse';
import { Capital } from '../../models/capital';
import { CapitalCacheService } from '../../../services/capital-cache.service';
import { GameSettings } from '../../models/gameSettings';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent implements OnInit {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
  ];

  capitals: Capital[] = [];
  currentCapital: Capital;
  score: number = 0;
  hadCapitalsInCache: boolean;
  errorMessage?: string;
  gameOptionsPicked: boolean = false;
  gameSettings: GameSettings;
  regionId: number = undefined;

  constructor(
    private capitalService: CapitalService,
    private capitalCacheService: CapitalCacheService
  ) {}

  ngOnInit(): void {
    const capitalsCache = this.capitalCacheService.getCapitals();
    this.capitals = Array.isArray(capitalsCache) ? [...capitalsCache] : [];
    this.hadCapitalsInCache = this.capitals.length > 1;
  }

  loadCapitals(rId?: number) {
    if (!this.hadCapitalsInCache) {
      if (rId) {
        this.capitalService.getAllCapitals(rId).subscribe({
          next: (capitalsResponse: CapitalsResponse) => {
            this.capitals = [...capitalsResponse.capitals];
            this.capitalCacheService.setCapitals([...this.capitals]);
          },
          error: (error) => {
            console.error('Error loading capitals', error);
            this.errorMessage =
              'Apologies,server might be undergoing a maintenence right now, try again later.';
          },
          complete: () => {
            this.randomizeAndRemoveCapital(this.capitals);
          },
        });
      } else {
        this.capitalService.getAllCapitals().subscribe({
          next: (capitalsResponse: CapitalsResponse) => {
            this.capitals = [...capitalsResponse.capitals];
            this.capitalCacheService.setCapitals([...this.capitals]);
          },
          error: (error) => {
            console.error('Error loading capitals', error);
            this.errorMessage =
              'Apologies,server might be undergoing a maintenence right now, try again later.';
          },
          complete: () => {
            this.randomizeAndRemoveCapital(this.capitals);
          },
        });
      }
    } else {
      if (this.gameSettings.region !== 'World') {
        this.capitals = this.capitals.filter(
          (element) => element.region == this.gameSettings.region
        );
      }
      this.randomizeAndRemoveCapital(this.capitals);
    }
  }
  //pick a random element from the array, put it on the last spot, pop.
  randomizeAndRemoveCapital(array: Capital[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const removedCapital: Capital = array.pop();
    this.currentCapital = removedCapital;
  }

  handleAnswer(isCorrect: boolean) {
    isCorrect && this.score++;
    this.randomizeAndRemoveCapital(this.capitals);
  }

  onOptionsSelected(options: GameSettings) {
    this.gameSettings = options;
    this.gameOptionsPicked = true;
    if (this.gameSettings.region !== 'World') {
      this.regionId = this.getRegionId(this.gameSettings.region);
      return this.loadCapitals(this.regionId);
    }
    this.loadCapitals();
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
}

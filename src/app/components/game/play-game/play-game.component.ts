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
  errorMessage?: string;
  gameOptionsPicked: boolean = false;
  gameSettings: GameSettings;
  regionId: number = undefined;

  constructor(
    private capitalService: CapitalService,
    private capitalCacheService: CapitalCacheService
  ) {}

  ngOnInit(): void {
    const capitalsCache = this.capitalCacheService.getCapitalsFromCache();
    this.capitals = Array.isArray(capitalsCache) ? [...capitalsCache] : [];
  }

  startGame(rId?: number) {
    if (this.capitals.length < 1) {
      this.loadCapitalsWithoutCache(rId);
      return;
    }
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

  handleAnswer(isCorrect: boolean) {
    isCorrect && this.score++;
    this.loadCurrentCapital();
  }

  loadCapitalsWithoutCache(regionID?: number) {
    this.capitalService.getAllCapitals(regionID).subscribe({
      next: (capitalsResponse: CapitalsResponse) => {
        this.capitals = [...capitalsResponse.capitals];
        if (!regionID) {
          this.capitalCacheService.setCapitalsInCache([...this.capitals]);
        }
      },
      error: (error) => {
        console.error('Error while loading capitals', error);
        this.errorMessage = 'Apologies,maintenence';
      },
      complete: () => {
        this.loadCurrentCapital();
      },
    });
  }

  onOptionsSelected(options: GameSettings) {
    this.gameSettings = options;
    this.gameOptionsPicked = true;
    if (this.gameSettings.region !== 'World') {
      this.regionId = this.getRegionId(this.gameSettings.region);
      return this.startGame(this.regionId);
    }
    this.startGame();
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

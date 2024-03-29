import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { Capital } from '../../models/capital';
import { CapitalsResponse } from '../../models/capitalsResponse';
import { CapitalCacheService } from '../../../services/capital-cache.service';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrl: './capitals-list.component.css',
})
export class CapitalsListComponent implements OnInit {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play-game'),
  ];
  capitals: Capital[] = [];
  errorMessage?: string;

  constructor(
    private capitalService: CapitalService,
    private capitalCacheService: CapitalCacheService
  ) {}

  ngOnInit() {
    this.capitals = this.capitalCacheService.getCapitalsFromCache();
    if (!this.capitals) {
      this.capitalService.getAllCapitals().subscribe({
        next: (capitalsResponse: CapitalsResponse) => {
          this.capitals = [...capitalsResponse.capitals];
          this.capitalCacheService.setCapitalsInCache(this.capitals);
        },
        error: (error) => {
          console.error('Error loading capitals:', error);
          this.errorMessage =
            'Apologies, our server might be undergoing a maintenance, please try exploring in a couple of minutes';
        },
      });
    }
  }
}

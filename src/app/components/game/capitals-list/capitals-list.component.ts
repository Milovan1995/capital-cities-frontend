import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { Capital } from '../../models/capital';
import { CapitalCacheService } from '../../../services/capital-cache.service';
import { Observable, catchError, defer, map, of } from 'rxjs';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrl: './capitals-list.component.css',
})
export class CapitalsListComponent {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play-game'),
  ];
  capitals$: Observable<Capital[]> = this.loadCapitals();
  test$: Observable<Capital[]> = this.capitalService
    .getAllCapitals()
    .pipe(map((response) => response.capitals));
  errorMessage?: string;

  constructor(
    private capitalService: CapitalService,
    private capitalCacheService: CapitalCacheService
  ) {}
  private loadCapitals(): Observable<Capital[]> {
    return defer(() => {
      const cachedCapitals = this.capitalCacheService.getCapitalsFromCache();
      if (cachedCapitals && cachedCapitals.length > 0) {
        return of(cachedCapitals);
      } else {
        return this.capitalService.getAllCapitals().pipe(
          map((response) => {
            this.capitalCacheService.setCapitalsInCache(response.capitals);
            return response.capitals;
          }),
          catchError((error) => {
            console.error(error);
            this.errorMessage =
              'Apologies, our server might be undergoing maintenance';
            return of([]);
          })
        );
      }
    });
  }
}

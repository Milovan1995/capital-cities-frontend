import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  defer,
  map,
  shareReplay,
  throwError,
} from 'rxjs';
import { Capital } from '../components/models/capital';
import { CapitalService } from './capital.service';

@Injectable({
  providedIn: 'root',
})
export class CapitalCacheService {
  private capitals$: Observable<Capital[]>;
  constructor(private capitalService: CapitalService) {
    this.capitals$ = this.loadCapitals().pipe(shareReplay(1));
  }
  private loadCapitals(): Observable<Capital[]> {
    return defer(() => {
      return this.capitalService.getAllCapitals().pipe(
        map((response) => response.capitals),
        catchError((error) => {
          console.error('Error caught in capital cache service', error);
          return throwError(() => error);
        })
      );
    });
  }
  getCapitals(): Observable<Capital[]> {
    return this.capitals$;
  }
  refreshCapitals(): void {
    this.capitals$ = this.loadCapitals().pipe(shareReplay(1));
  }
}

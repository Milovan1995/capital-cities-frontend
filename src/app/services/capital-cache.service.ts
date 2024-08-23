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
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CapitalCacheService {
  private capitals$: Observable<Capital[]>;
  constructor(
    private capitalService: CapitalService,
    private _trans: TranslateService
  ) {
    this.capitals$ = this.loadCapitals().pipe(shareReplay(1));
  }

  private loadCapitals(): Observable<Capital[]> {
    return defer(() => {
      return this.capitalService.getAllCapitals().pipe(
        map((response) => response.capitals),
        catchError((error) => {
          console.error(this._trans.instant('error'), error);
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

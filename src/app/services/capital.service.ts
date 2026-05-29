import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CapitalsResponse } from '../components/models/capitalsResponse';
import { throwError, Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { GameConfigResponse } from '../components/models/gameConfigResponse';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occurred : ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }

  getAllCapitals(regionId?: number) {
    return this.http
      .get<CapitalsResponse>(
        `${environment.API_URL}/game/capitals/${regionId ?? ''}`
      )
      .pipe(catchError(this.handleError));
  }

  getGameConfig() {
    return this.http
      .get<GameConfigResponse>(`${environment.API_URL}/game/config`)
      .pipe(catchError(this.handleError));
  }
}

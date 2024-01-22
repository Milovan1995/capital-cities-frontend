import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CapitalsResponse } from '../components/models/capitalsResponse';
import { throwError, Observable, catchError } from 'rxjs';

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
        `http://localhost:3000/game/capitals/${regionId ?? ''}`
      )
      .pipe(catchError(this.handleError));
  }
}
// /api/game/capitals/:regionId?

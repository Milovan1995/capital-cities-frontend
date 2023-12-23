import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapitalsResponse } from '../components/models/capitalsResponse';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  constructor(private http: HttpClient) {}

  getAllCapitals(regionId?: number) {
    return this.http.get<CapitalsResponse>(
      `http://localhost:3000/api/game/capitals${regionId ? '/' + regionId : ''}`
    );
  }
}
// /api/game/capitals/:regionId?

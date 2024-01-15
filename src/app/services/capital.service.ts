import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capital } from '../components/models/capital';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  constructor(private http: HttpClient) {}

  getAllCapitals(regionId?: number) {
    return this.http.get<Record<string, Capital[]>>(
      `http://localhost:3000/game/capitals${regionId ? '/' + regionId : ''}`
    );
  }
}
// /api/game/capitals/:regionId?

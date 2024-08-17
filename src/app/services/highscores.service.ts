import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../components/models/score';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private http: HttpClient) {}
  getAllHighscores(duration: number, limit: number) {
    return this.http.get<Record<string, Score[]>>(
      `${environment.API_URL}/api/highscores/${duration}/${limit}`
    );
  }
}

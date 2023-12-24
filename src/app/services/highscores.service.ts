import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../components/models/score';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private http: HttpClient) {}
  getAllHighscores(duration: number, limit: number) {
    return this.http.get<Record<string, Score[]>>(
      `http://localhost:3000/api/highscores/${duration}/${limit}`
    );
  }
}
// api/scores/highscores/:duration/:limit

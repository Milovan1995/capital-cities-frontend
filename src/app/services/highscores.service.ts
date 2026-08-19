import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../components/models/score';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private http: HttpClient) {}

  getAllHighscores(duration: number, limit: number) {
    return this.http.get<Score[]>(
      `${environment.API_URL}/scores/highscores/duration/${duration}/limit/${limit}`
    );
  }

  saveGameScore(
    score: number,
    durationId: number,
    regionId?: number
  ) {
    const payload: { score: number; durationId: number; regionId?: number } = {
      score,
      durationId,
    };

    if (regionId !== undefined) payload.regionId = regionId;

    return this.http
      .post<{ message: string }>(
        `${environment.API_URL}/scores/save-game`,
        payload
      )
      .pipe(map((response) => response.message));
  }
}

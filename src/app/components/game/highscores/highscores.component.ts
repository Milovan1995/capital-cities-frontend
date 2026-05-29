import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { Score } from '../../models/score';
import { HighscoresService } from '../../../services/highscores.service';
import { CapitalService } from '../../../services/capital.service';
import { Duration } from '../../models/duration';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.css',
})
export class HighscoresComponent implements OnInit {
  highscores: Score[] = [];
  durations: Duration[] = [];
  selectedDuration?: number;
  errorMessage?: string;
  navbarLinks: Link[] = [
    new Link('Profile', '/pages/user'),
    new Link('Highscores', '/capitals/highscores'),
    new Link('Feedback', '/pages/user/feedback'),
    new Link('Play', '/capitals/play-game'),
  ];

  constructor(
    private highscoresService: HighscoresService,
    private capitalService: CapitalService
  ) {}

  ngOnInit(): void {
    this.capitalService.getGameConfig().subscribe({
      next: ({ durations }) => {
        this.durations = durations;
        this.selectedDuration = durations[0]?.value;
        if (this.selectedDuration) {
          this.loadHighscores(this.selectedDuration);
        }
      },
      error: (error) => {
        console.error('Error while loading durations', error);
        this.errorMessage = 'Unable to load highscores.';
      },
    });
  }

  onDurationChange(duration: string) {
    const parsedDuration = Number(duration);
    this.selectedDuration = parsedDuration;
    this.loadHighscores(parsedDuration);
  }

  private loadHighscores(duration: number) {
    this.highscoresService.getAllHighscores(duration, 10).subscribe({
      next: (highscores) => {
        this.highscores = highscores;
      },
      error: (error) => {
        console.error('Error while loading highscores', error);
        this.errorMessage = 'Unable to load highscores.';
      },
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrl: './highscores.component.css',
})
export class HighscoresComponent {
  highscores: string[] = ['skor 1', 'skor2'];
}

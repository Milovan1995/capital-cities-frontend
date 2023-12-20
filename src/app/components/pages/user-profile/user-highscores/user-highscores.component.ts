import { Component } from '@angular/core';

@Component({
  selector: 'app-user-highscores',
  templateUrl: './user-highscores.component.html',
  styleUrl: './user-highscores.component.css',
})
export class UserHighscoresComponent {
  scores: number[] = [12,15,21];
}

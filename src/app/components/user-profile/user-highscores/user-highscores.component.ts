import { Component, Input } from '@angular/core';
import { UserStats } from '../../models/userStats';

@Component({
  selector: 'app-user-highscores',
  templateUrl: './user-highscores.component.html',
  styleUrl: './user-highscores.component.css',
})
export class UserHighscoresComponent {
  @Input() stats?: UserStats;
}

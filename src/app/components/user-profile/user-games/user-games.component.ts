import { Component, Input } from '@angular/core';
import { UserStats } from '../../models/userStats';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrl: './user-games.component.css',
})
export class UserGamesComponent {
  @Input() stats?: UserStats;
}

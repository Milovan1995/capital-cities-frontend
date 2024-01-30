import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css',
})
export class GameResultsComponent {
  @Input() score: number;
}

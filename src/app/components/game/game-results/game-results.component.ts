import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.css',
})
export class GameResultsComponent {
  @Input() score: number;
  @Input() scoreSaveState: 'not-started' | 'pending' | 'saved' | 'failed' = 'not-started';
  @Output() retrySave = new EventEmitter<void>();
}

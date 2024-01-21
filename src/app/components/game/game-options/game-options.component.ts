import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GameSettings } from '../../models/gameSettings';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent {
  @Output() optionsSelected: EventEmitter<GameSettings> =
    new EventEmitter<GameSettings>();

  gameSettings: GameSettings = {
    region: 'World',
    timer: 60,
  };

  onSubmit() {
    console.log(this.gameSettings);
    this.optionsSelected.emit({
      region: this.gameSettings.region,
      timer: this.gameSettings.timer,
    });
  }
}

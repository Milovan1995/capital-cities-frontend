import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GameSettings, timers } from '../../models/gameSettings';
import { regions } from '../../models/region';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent {
  @Output() optionsSelected: EventEmitter<GameSettings> =
    new EventEmitter<GameSettings>();
  form: FormGroup = new FormGroup({
    region: new FormControl('World', Validators.required),
    timer: new FormControl(60, Validators.required),
  });
  readonly regions = regions;
  readonly timers = timers;
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.optionsSelected.emit(this.form.value);
  }
}

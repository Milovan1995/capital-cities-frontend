import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Capital } from '../../models/capital';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent {
  @Input() capital: Capital;
  @Output() answeredCorrectly: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  answer: string;
  onUserAnswer() {
    let currentAnswer = this.answer ? this.answer : '';
    this.answer = undefined;
    this.answeredCorrectly.emit(
      currentAnswer.toUpperCase() === this.capital.capital.toUpperCase()
    );
  }
}

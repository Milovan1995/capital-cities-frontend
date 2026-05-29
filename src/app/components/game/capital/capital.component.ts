import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Capital } from '../../models/capital';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent {
  @Input() capital: Capital;
  @Output() answeredCorrectly: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  form: FormGroup = new FormGroup({
    answer: new FormControl(''),
  });
  onUserAnswer() {
    const answer = (this.form.get('answer')?.value ?? '').toString().trim();
    this.answeredCorrectly.emit(
      answer.toUpperCase() === this.capital.capital.toUpperCase()
    );
    this.form.reset();
  }
}

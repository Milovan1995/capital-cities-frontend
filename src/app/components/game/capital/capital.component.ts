import { Component, Input } from '@angular/core';
import { Capital } from '../../models/capital';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent {
  @Input() capital: Capital;
}

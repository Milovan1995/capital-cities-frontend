import { Component, Input } from '@angular/core';
import { Link } from '../../components/models/link';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() route: Link;
}

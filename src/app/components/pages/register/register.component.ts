import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];
}

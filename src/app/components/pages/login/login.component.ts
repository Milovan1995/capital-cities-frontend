import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];
}

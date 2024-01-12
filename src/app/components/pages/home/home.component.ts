import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navbarItems: Link[] = [{ name: 'Login', route: '/pages/login' }];
}

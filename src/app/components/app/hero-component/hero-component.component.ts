import { Component } from '@angular/core';
import { Link } from '../../models/link';
@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrl: './hero-component.component.css',
})
export class HeroComponentComponent {
  buttonLink: Link = new Link('Start Now', '/home');
}

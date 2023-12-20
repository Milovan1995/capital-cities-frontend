import { Component } from '@angular/core';
@Component({
  selector: 'app-hero-component',
  templateUrl: './hero-component.component.html',
  styleUrl: './hero-component.component.css',
})
export class HeroComponentComponent {
  texts: string[] = [
    'Guess the names of capital cities for random countries, collect scores,  track your progress and unlock achievements while competing with other players.',
    'Very useful and fun game to play!',
    "I didn't realise how many countries there are! Woah.",
  ];
  someText: string = this.texts[0];
}

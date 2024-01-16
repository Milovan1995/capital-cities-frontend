import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { CapitalsResponse } from '../../models/capitalsResponse';
import { Capital } from '../../models/capital';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.css',
})
export class PlayGameComponent implements OnInit {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Explore', '/capitals'),
  ];

  capitals: Capital[] = [];
  currentCapital: Capital;
  score: number = 0;
  errorMessage?: string;

  constructor(private capitalService: CapitalService) {}

  ngOnInit(): void {
    this.capitalService.getAllCapitals().subscribe({
      next: (capitalsResponse: CapitalsResponse) => {
        this.capitals = [...capitalsResponse.capitals];
      },
      error: (error) => {
        console.error('Error loading capitals', error);
        this.errorMessage =
          'Apologies,server might be undergoing a maintenence right now, try again later.';
      },
    });
    this.randomizeAndRemove(this.capitals);
  }
  randomizeAndRemove(array: Capital[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    const removedCapital: Capital = array.pop();
    console.log(removedCapital.capital);
    this.currentCapital = removedCapital;
  }
  handleAnswer(isCorrect: boolean) {
    isCorrect && this.score++;
    this.randomizeAndRemove(this.capitals);
  }
}

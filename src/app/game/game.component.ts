import { Component, OnInit } from '@angular/core';

import { MyApiService } from '../my-api.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  constructor(private myApiService: MyApiService) {}
  ngOnInit(): void {
    this.myApiService.getData().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error(error, 'error');
      },
    } as Observer<any>);
  }
}

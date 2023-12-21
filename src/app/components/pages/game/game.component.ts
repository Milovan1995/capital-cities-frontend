import { Component, OnInit } from '@angular/core';

import { MyApiService } from '../../../my-api.service';
import { Observer } from 'rxjs';
import { Capital } from '../../models/capital';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  constructor(private myApiService: MyApiService) {}
  capitals: Capital[] = [];
  ngOnInit(): void {
    this.myApiService.getData().subscribe({
      next: (data: any) => {
        this.capitals = data.capitals;
      },
      error: (error: any) => {
        console.error(error, 'error');
      },
    } as Observer<any>);
  }
}

import { Component, OnInit } from '@angular/core';
import { Capital } from '../../../models/capital';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent implements OnInit {
  capitals: Capital[] = [new Capital(0, 'Montenegro', 'Podgorica', 1)];
  ngOnInit(): void {
    console.log(this.capitals);
  }
}

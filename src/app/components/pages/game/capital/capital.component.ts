import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Capital } from '../../../models/capital';
import { CapitalService } from '../../../../services/capital.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent implements OnInit, AfterContentInit {
  capitals: Capital[] = [];
  constructor(private capitalService: CapitalService) {}
  random: number;
  ngOnInit(): void {
    this.capitalService.getAllCapitals().subscribe((data) => {
      this.capitals = data.capitals;
    });
  }
  ngAfterContentInit(): void {
    if (this.capitals && this.capitals.length) {
      this.random = Math.floor(Math.random() * this.capitals.length);
    }
  }
}

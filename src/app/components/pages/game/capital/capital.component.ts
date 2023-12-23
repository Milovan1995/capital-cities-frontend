import { Component, OnInit } from '@angular/core';
import { Capital } from '../../../models/capital';
import { CapitalService } from '../../../../services/capital.service';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.css',
})
export class CapitalComponent implements OnInit {
  capitals: Capital[];
  constructor(private capitalService: CapitalService) {}

  ngOnInit(): void {
    this.capitals = this.capitalService.getAllCapitals();
  }
}

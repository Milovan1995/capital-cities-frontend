import { Component, OnInit } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { Capital } from '../../models/capital';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrl: './capitals-list.component.css',
})
export class CapitalsListComponent implements OnInit {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play'),
  ];
  capitals: Capital[];
  constructor(private capitalService: CapitalService) {}
  ngOnInit() {
    this.capitalService
      .getAllCapitals()
      .subscribe((capitals) => (this.capitals = [...capitals['capitals']]));
  }
  showRegion(region_id: number): string {
    switch (region_id) {
      case 1:
        return 'Europe';
      case 2:
        return 'Asia';
      case 3:
        return 'Africa';
      case 4:
        return 'Oceania';
      default:
        return 'North and South America';
    }
  }
}

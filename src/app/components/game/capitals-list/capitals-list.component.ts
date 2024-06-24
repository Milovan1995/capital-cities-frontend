import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { CapitalService } from '../../../services/capital.service';
import { Capital } from '../../models/capital';
import { CapitalCacheService } from '../../../services/capital-cache.service';
import { Observable, catchError, defer, map, of } from 'rxjs';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrl: './capitals-list.component.css',
})
export class CapitalsListComponent {
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play-game'),
  ];
  capitals$: Observable<Capital[]> = this.capitalCacheService
    .getCapitals()
    .pipe(
      catchError((error) => {
        this.errorMessage = 'An error occured, please try again later...';
        console.warn(error);
        return of([]);
      })
    );
  errorMessage?: string;

  constructor(private capitalCacheService: CapitalCacheService) {}
}

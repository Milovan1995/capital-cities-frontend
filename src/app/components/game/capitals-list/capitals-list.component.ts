import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { Link } from '../../models/link';
import { Capital } from '../../models/capital';
import { CapitalCacheService } from '../../../services/capital-cache.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-capitals-list',
  templateUrl: './capitals-list.component.html',
  styleUrls: ['./capitals-list.component.css'], // corrected 'styleUrl' to 'styleUrls'
})
export class CapitalsListComponent implements OnInit, OnDestroy {
  readonly capitalsList: Signal<Capital[]>;
  navbarLinks: Link[] = [
    new Link('About', '/about'),
    new Link('Play Now', '/capitals/play-game'),
  ];
  form = new FormGroup({
    term: new FormControl(null),
  });
  capitals$: Signal<Capital[]>;
  searchTerm$ = signal<string>('');
  errorMessage?: string;
  destroy$ = new Subject<void>();

  constructor(
    private capitalCacheService: CapitalCacheService,
    private _trans: TranslateService
  ) {
    this.capitalsList = toSignal(
      this.capitalCacheService.getCapitals().pipe(
        catchError(() => {
          this.errorMessage = this._trans.instant('error');
          return of([]);
        })
      ),
      { initialValue: [] }
    );

    this.capitals$ = computed(() => {
      return this.capitalsList().filter(
        (capital) =>
          capital.capital
            .toLowerCase()
            .includes(this.searchTerm$().toLowerCase()) ||
          capital.country
            .toLowerCase()
            .includes(this.searchTerm$().toLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.form.controls.term.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.searchTerm$.set(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Capital } from '../components/models/capital';

@Injectable({
  providedIn: 'root',
})
export class CapitalCacheService {
  constructor() {}

  private capitalSubject: BehaviorSubject<Capital[]> = new BehaviorSubject<
    Capital[]
  >(null);

  getCapitalsFromCache(): Capital[] {
    return this.capitalSubject.value;
  }

  setCapitalsInCache(capitals: Capital[]) {
    this.capitalSubject.next(capitals);
  }
}

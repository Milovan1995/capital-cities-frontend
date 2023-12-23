import { Injectable } from '@angular/core';
import { Capital } from '../components/models/capital';

@Injectable({
  providedIn: 'root',
})
export class CapitalService {
  constructor() {}
  getAllCapitals(): Capital[] {
    return [
      new Capital(0, 'Montenegro', 'Podgorica', 1),
      new Capital(1, 'Serbia', 'Belgrade', 1),
    ];
  }
}

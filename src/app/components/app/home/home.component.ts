import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  time$: BehaviorSubject<string> = new BehaviorSubject<string>(this.getTime());

  interval: NodeJS.Timeout;

  // TODO adapt css and add an image, use signals instead of observables
  private getTime() {
    const hours = new Date().getHours().toString().padStart(2, '0');
    const minutes = new Date().getMinutes().toString().padStart(2, '0');
    const seconds = new Date().getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.time$.next(this.getTime());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  time$ = signal<string>(this.getTime());
  interval: NodeJS.Timeout;

  private getTime() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false });
  }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.time$.set(this.getTime());
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

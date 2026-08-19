import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsComponent } from './game-results.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameResultsComponent],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

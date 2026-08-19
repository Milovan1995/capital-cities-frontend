import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGamesComponent } from './user-games.component';
import { TranslateModule } from '@ngx-translate/core';

describe('UserGamesComponent', () => {
  let component: UserGamesComponent;
  let fixture: ComponentFixture<UserGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGamesComponent],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

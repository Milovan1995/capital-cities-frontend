import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHighscoresComponent } from './user-highscores.component';

describe('UserHighscoresComponent', () => {
  let component: UserHighscoresComponent;
  let fixture: ComponentFixture<UserHighscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHighscoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHighscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

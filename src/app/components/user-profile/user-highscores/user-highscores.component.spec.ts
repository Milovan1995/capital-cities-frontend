import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHighscoresComponent } from './user-highscores.component';
import { TranslateModule } from '@ngx-translate/core';

describe('UserHighscoresComponent', () => {
  let component: UserHighscoresComponent;
  let fixture: ComponentFixture<UserHighscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHighscoresComponent],
      imports: [TranslateModule.forRoot()]
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

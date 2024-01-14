import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalsListComponent } from './capitals-list.component';

describe('CapitalsListComponent', () => {
  let component: CapitalsListComponent;
  let fixture: ComponentFixture<CapitalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapitalsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

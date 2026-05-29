import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { GameOptionsComponent } from './game-options.component';
import { CapitalService } from '../../../services/capital.service';
import { GameConfigResponse } from '../../models/gameConfigResponse';

describe('GameOptionsComponent', () => {
  let component: GameOptionsComponent;
  let fixture: ComponentFixture<GameOptionsComponent>;
  let capitalServiceSpy: jasmine.SpyObj<CapitalService>;

  const mockConfig: GameConfigResponse = {
    regions: [{ id: 1, name: 'Europe' }],
    durations: [{ id: 2, value: 30 }],
  };

  beforeEach(async () => {
    capitalServiceSpy = jasmine.createSpyObj('CapitalService', ['getGameConfig']);
    capitalServiceSpy.getGameConfig.and.returnValue(of(mockConfig));

    await TestBed.configureTestingModule({
      declarations: [GameOptionsComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: CapitalService, useValue: capitalServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load config and preselect the first duration', () => {
    expect(capitalServiceSpy.getGameConfig).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(component.form.value.durationId).toBe(2);
    expect(component.selectedRegionName).toBe('World');
  });

  it('should emit selected settings when the form is submitted', () => {
    spyOn(component.optionsSelected, 'emit');
    component.form.patchValue({ region: 'Europe', durationId: 2 });

    const submitButton = fixture.debugElement.query(By.css('.game-options-button'));
    submitButton.nativeElement.click();

    expect(component.optionsSelected.emit).toHaveBeenCalledWith({
      region: 'Europe',
      regionId: 1,
      durationId: 2,
      timer: 30,
    });
  });
});

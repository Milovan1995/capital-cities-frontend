import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GameSettings } from '../../models/gameSettings';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CapitalService } from '../../../services/capital.service';
import { Region } from '../../models/region';
import { Duration } from '../../models/duration';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css',
})
export class GameOptionsComponent implements OnInit {
  @Output() optionsSelected: EventEmitter<GameSettings> =
    new EventEmitter<GameSettings>();

  form: FormGroup = new FormGroup({
    region: new FormControl('World', Validators.required),
    durationId: new FormControl<number | null>(null, Validators.required),
  });

  regions: Region[] = [];
  durations: Duration[] = [];
  errorMessage?: string;

  constructor(private capitalService: CapitalService) {}

  ngOnInit(): void {
    this.capitalService.getGameConfig().subscribe({
      next: ({ regions, durations }) => {
        this.regions = regions;
        this.durations = durations;
        if (durations.length > 0) {
          this.form.patchValue({ durationId: durations[0].id });
        }
      },
      error: (error) => {
        console.error('Error while loading game configuration', error);
        this.errorMessage = 'Unable to load game settings.';
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const selectedDuration = this.durations.find(
      (duration) => duration.id === this.form.value.durationId
    );
    const selectedRegionName = this.form.value.region;
    const selectedRegion = this.regions.find(
      (region) => region.name === selectedRegionName
    );

    this.optionsSelected.emit({
      region: selectedRegionName,
      regionId: selectedRegion?.id,
      durationId: selectedDuration.id,
      timer: selectedDuration.value,
    });
  }
}

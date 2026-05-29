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
  isLoading: boolean = true;
  readonly worldRegionName = 'World';

  constructor(private capitalService: CapitalService) {}

  ngOnInit(): void {
    this.setFormDisabledState(true);
    this.capitalService.getGameConfig().subscribe({
      next: ({ regions, durations }) => {
        this.regions = regions;
        this.durations = durations;
        if (durations.length > 0) {
          this.form.patchValue({ durationId: durations[0].id });
        }
        this.isLoading = false;
        this.setFormDisabledState(false);
      },
      error: (error) => {
        console.error('Error while loading game configuration', error);
        this.errorMessage = 'Unable to load game settings.';
        this.isLoading = false;
        this.setFormDisabledState(false);
      },
    });
  }

  get selectedDuration(): Duration | undefined {
    return this.durations.find(
      (duration) => duration.id === this.form.value.durationId
    );
  }

  get selectedRegionName(): string {
    return this.form.value.region ?? this.worldRegionName;
  }

  get isReadyToStart(): boolean {
    return !this.isLoading && this.form.valid && this.durations.length > 0;
  }

  getRegionTranslationKey(regionName: string): string {
    const regionKeyMap: Record<string, string> = {
      World: 'regions.world',
      Europe: 'regions.europe',
      Asia: 'regions.asia',
      Africa: 'regions.africa',
      Australia: 'regions.australia',
      'North and South America': 'regions.north-and-south-america',
      Oceania: 'regions.oceania',
    };

    return regionKeyMap[regionName] ?? regionName;
  }

  onSubmit() {
    if (!this.isReadyToStart || !this.selectedDuration) {
      return;
    }

    const selectedRegionName = this.selectedRegionName;
    const selectedRegion = this.regions.find(
      (region) => region.name === selectedRegionName
    );

    this.optionsSelected.emit({
      region: selectedRegionName,
      regionId: selectedRegion?.id,
      durationId: this.selectedDuration.id,
      timer: this.selectedDuration.value,
    });
  }

  private setFormDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}

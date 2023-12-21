import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RegionComponent } from './region/region.component';
import { DurationComponent } from './duration/duration.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { RouterModule } from '@angular/router';
import { CapitalComponent } from './capital/capital.component';

@NgModule({
  declarations: [
    GameComponent,
    RegionComponent,
    DurationComponent,
    PlayGameComponent,
    HighscoresComponent,
    CapitalComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [GameComponent, PlayGameComponent, HighscoresComponent],
})
export class GameModule {}

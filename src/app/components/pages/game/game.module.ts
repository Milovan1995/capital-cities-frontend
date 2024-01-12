import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RegionComponent } from './region/region.component';
import { DurationComponent } from './duration/duration.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { RouterModule } from '@angular/router';
import { CapitalComponent } from './capital/capital.component';
import { UtilModule } from '../../../util/util.module';
import { PlayGameComponent } from './play-game/play-game.component';

@NgModule({
  declarations: [
    GameComponent,
    RegionComponent,
    DurationComponent,
    HighscoresComponent,
    CapitalComponent,
    PlayGameComponent,
  ],
  imports: [CommonModule, RouterModule, UtilModule],
  exports: [GameComponent, HighscoresComponent, PlayGameComponent],
})
export class GameModule {}

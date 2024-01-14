import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { RouterModule } from '@angular/router';
import { CapitalComponent } from './capital/capital.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { UtilModule } from '../../util/util.module';
import { GameRoutingModule } from './game-routing.module';
import { CapitalsListComponent } from './capitals-list/capitals-list.component';

@NgModule({
  declarations: [
    GameComponent,
    HighscoresComponent,
    CapitalComponent,
    PlayGameComponent,
    CapitalsListComponent,
  ],
  imports: [CommonModule, RouterModule, UtilModule, GameRoutingModule],
  exports: [
    GameComponent,
    HighscoresComponent,
    PlayGameComponent,
    CapitalComponent,
    CapitalsListComponent,
  ],
})
export class GameModule {}

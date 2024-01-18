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
import { FormsModule } from '@angular/forms';
import { GameOptionsComponent } from './game-options/game-options.component';

@NgModule({
  declarations: [
    GameComponent,
    HighscoresComponent,
    CapitalComponent,
    PlayGameComponent,
    CapitalsListComponent,
    GameOptionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    GameRoutingModule,
    FormsModule,
  ],
  exports: [
    GameComponent,
    HighscoresComponent,
    PlayGameComponent,
    CapitalComponent,
    CapitalsListComponent,
    GameOptionsComponent,
  ],
})
export class GameModule {}

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
import { GameResultsComponent } from './game-results/game-results.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GameComponent,
    HighscoresComponent,
    CapitalComponent,
    PlayGameComponent,
    CapitalsListComponent,
    GameOptionsComponent,
    GameResultsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UtilModule,
    GameRoutingModule,
    FormsModule,
    TranslateModule,
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

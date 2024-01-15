import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalsListComponent } from './capitals-list/capitals-list.component';
import { PlayGameComponent } from './play-game/play-game.component';
const routes: Routes = [
  { path: '', component: CapitalsListComponent },
  { path: 'play-game', component: PlayGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}

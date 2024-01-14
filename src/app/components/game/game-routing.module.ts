import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalsListComponent } from './capitals-list/capitals-list.component';
const routes: Routes = [{ path: '', component: CapitalsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './components/pages/hero-component/hero-component.component';
const routes: Routes = [
  { path: '', component: HeroComponentComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/pages.module').then((pm) => pm.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

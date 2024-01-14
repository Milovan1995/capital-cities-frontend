import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './components/app/hero-component/hero-component.component';
import { HomeComponent } from './components/app/home/home.component';
import { AboutComponent } from './components/app/about/about.component';
const routes: Routes = [
  { path: '', component: HeroComponentComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/pages/pages.module').then((pm) => pm.PagesModule),
  },
  {
    path: 'capitals',
    loadChildren: () =>
      import('../app/components/game/game.module').then((gm) => gm.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { TestComponent } from '../../test/test.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GameComponent } from './game/game.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HighscoresComponent } from './game/highscores/highscores.component';
import { CapitalComponent } from './game/capital/capital.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HeroComponentComponent },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserProfileComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'highscores',
    component: HighscoresComponent,
  },
  {
    path: 'capitals',
    component: CapitalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

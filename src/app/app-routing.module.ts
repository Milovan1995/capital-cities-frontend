import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GameComponent } from './game/game.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HighscoresComponent } from './game/highscores/highscores.component';

const routes: Routes = [
  { path: '', component: HeroComponentComponent },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'auth/register',
    component: AuthComponent,
  },
  {
    path: 'auth/login',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

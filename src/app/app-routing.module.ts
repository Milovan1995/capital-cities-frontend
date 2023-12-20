import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './components/pages/hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { GameComponent } from './components/pages/game/game.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { HighscoresComponent } from './components/pages/game/highscores/highscores.component';

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

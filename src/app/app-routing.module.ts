import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './components/pages/hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { GameComponent } from './components/pages/game/game.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { HighscoresComponent } from './components/pages/game/highscores/highscores.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: HeroComponentComponent },
  {
    path: 'test',
    component: TestComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

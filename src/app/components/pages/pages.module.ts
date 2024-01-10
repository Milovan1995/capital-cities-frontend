import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { AchievementsComponent } from './user-profile/achievements/achievements.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserHighscoresComponent } from './user-profile/user-highscores/user-highscores.component';
import { UserGamesComponent } from './user-profile/user-games/user-games.component';
import { GameModule } from './game/game.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    AchievementsComponent,
    FeedbackComponent,
    UserHighscoresComponent,
    UserGamesComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, RouterModule, GameModule],
  exports: [
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    AchievementsComponent,
    FeedbackComponent,
    UserHighscoresComponent,
    UserGamesComponent,
  ],
})
export class PagesModule {}

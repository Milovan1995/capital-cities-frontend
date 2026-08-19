import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { UserHighscoresComponent } from './user-highscores/user-highscores.component';
import { UserPlayComponent } from './user-play/user-play.component';
import { UtilModule } from '../../util/util.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserProfileComponent,
    AchievementsComponent,
    FeedbackComponent,
    UserGamesComponent,
    UserHighscoresComponent,
    UserPlayComponent,
  ],
  imports: [CommonModule, UserProfileRoutingModule, UtilModule, TranslateModule],
  exports: [
    UserProfileComponent,
    AchievementsComponent,
    FeedbackComponent,
    UserGamesComponent,
    UserHighscoresComponent,
    UserPlayComponent,
  ],
})
export class UserProfileModule {}

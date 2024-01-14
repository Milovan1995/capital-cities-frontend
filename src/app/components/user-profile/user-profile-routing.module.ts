import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserPlayComponent } from './user-play/user-play.component';
import { UserHighscoresComponent } from './user-highscores/user-highscores.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'play', component: UserPlayComponent },
  { path: 'highscores', component: UserHighscoresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}

import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeroComponentComponent } from './components/pages/hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { NavbarComponent } from './util/navbar/navbar.component';
import { GameComponent } from './components/pages/game/game.component';
import { RegionComponent } from './components/pages/game/region/region.component';
import { DurationComponent } from './components/pages/game/duration/duration.component';
import { FooterComponent } from './util/footer/footer.component';
import { PlayGameComponent } from './components/pages/game/play-game/play-game.component';
import { AchievementsComponent } from './components/pages/user-profile/achievements/achievements.component';
import { HighscoresComponent } from './components/pages/game/highscores/highscores.component';
import { FeedbackComponent } from './components/pages/feedback/feedback.component';
import { UserHighscoresComponent } from './components/pages/user-profile/user-highscores/user-highscores.component';
import { UserGamesComponent } from './components/pages/user-profile/user-games/user-games.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilModule } from './util/util.module';
@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    TestComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    GameComponent,
    RegionComponent,
    DurationComponent,
    PlayGameComponent,
    AchievementsComponent,
    HighscoresComponent,
    FeedbackComponent,
    UserHighscoresComponent,
    UserGamesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, UtilModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

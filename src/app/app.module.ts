import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './util/navbar/navbar.component';
import { GameComponent } from './game/game.component';
import { RegionComponent } from './game/region/region.component';
import { DurationComponent } from './game/duration/duration.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    TestComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    NavbarComponent,
    GameComponent,
    RegionComponent,
    DurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

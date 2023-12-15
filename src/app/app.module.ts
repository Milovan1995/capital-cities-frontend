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

@NgModule({
  declarations: [
    AppComponent,
    HeroComponentComponent,
    TestComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    NavbarComponent
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

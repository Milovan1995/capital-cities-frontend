import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { UtilModule } from './util/util.module';
import { HeroComponentComponent } from './components/pages/hero-component/hero-component.component';
import { HomeComponent } from './components/pages/home/home.component';
@NgModule({
  declarations: [AppComponent, HeroComponentComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, UtilModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponentComponent } from './hero-component/hero-component.component';
import { TestComponent } from './test/test.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

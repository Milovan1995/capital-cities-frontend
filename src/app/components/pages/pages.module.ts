import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UtilModule } from '../../util/util.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UtilModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [RegisterComponent, LoginComponent],
})
export class PagesModule {}

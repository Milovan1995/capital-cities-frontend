import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UtilModule } from '../../util/util.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, PagesRoutingModule, UtilModule, FormsModule],
  exports: [RegisterComponent, LoginComponent],
})
export class PagesModule {}

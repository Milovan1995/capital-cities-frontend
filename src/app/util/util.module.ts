import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ButtonComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [NavbarComponent, FooterComponent, ButtonComponent],
})
export class UtilModule {}

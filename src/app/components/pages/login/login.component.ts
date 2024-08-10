import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];
  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private _trans: TranslateService
  ) {}

  login() {
    if (this.form.invalid) {
      alert(this._trans.instant('messages.enter-both-fields'));
      return;
    }
    this.auth.login(this.form.value).subscribe({
      next: (data: any) => {
        if (!!data.token) {
          localStorage.setItem('capitals-token', data.token);
          this.router.navigate(['/pages/user']);
        }
      },
      error: (error) => {
        console.error(`Error:${error}`);
        alert(error.message);
      },
    });
  }
}

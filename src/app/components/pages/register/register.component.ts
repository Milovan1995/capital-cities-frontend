import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private _trans: TranslateService
  ) {}

  register() {
    if (this.form.invalid) {
      alert(this._trans.instant('messages.enter-all-fields'));
      return;
    }
    if (this.form.get('password') !== this.form.get('confirmPassword')) {
      alert(this._trans.instant('messages.passwords-dont-match'));
      return;
    }
    this.auth
      .register({
        username: this.form.get('username').value,
        password: this.form.get('password').value,
      })
      .subscribe({
        next: (data: any) => {
          if (!!data.token) {
            localStorage.setItem('capitals-token', data.token);
            this.router.navigate(['/pages/user']);
          }
        },
        error: (error) => {
          alert(
            this._trans.instant('messages.something-wrong') + error.message
          );
          console.error(error);
        },
      });
  }
}

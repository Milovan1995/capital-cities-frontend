import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { User } from '../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];

  user: User = new User();
  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.form.invalid) {
      alert('Enter both fields!');
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

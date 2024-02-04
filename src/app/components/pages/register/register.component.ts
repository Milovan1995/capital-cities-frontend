import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { User } from '../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];

  user: User = new User();

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (
      !this.user.username ||
      !this.user.password ||
      !this.user.confirmPassword
    ) {
      alert('Enter all fields');
      return;
    }
    if (this.user.password !== this.user.confirmPassword) {
      alert("Password and the confirmed password aren't same!");
      return;
    }
    this.auth
      .register({
        username: this.user.username,
        password: this.user.password,
      })
      .subscribe({
        next: (data: any) => {
          if (!!data.token) {
            localStorage.setItem('capitals-token', data.token);
            this.router.navigate(['/pages/user']);
          }
        },
        error: (error) => {
          alert('Something went wrong' + error.message);
          console.error(error);
        },
      });
  }
}

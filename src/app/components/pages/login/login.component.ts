import { Component } from '@angular/core';
import { Link } from '../../models/link';
import { User } from '../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  navbarLinks: Link[] = [new Link('Home', '/home')];

  user: User = new User();
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.user.username || !this.user.password) {
      alert('Enter both fields!');
      return;
    }
    this.auth.login(this.user).subscribe({
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

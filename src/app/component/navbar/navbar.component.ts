import { Component, Injectable, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { LoginComponent } from '../../pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    CommonModule,
  ],
  providers: [LoginService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
@Injectable()
export class NavbarComponent {
  constructor(public _loginService: LoginService, private router: Router) {}
  logout() {
    this._loginService.doLogout();
    this.router.navigate(['/login']);
  }
}

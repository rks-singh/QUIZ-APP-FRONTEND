import { Component, Injectable } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIcon,
    RouterModule,
    RouterOutlet,
    MatButton,
  ],
  providers: [LoginService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
@Injectable()
export class SidebarComponent {
  constructor(private _loginService: LoginService, private _router: Router) {}

  logOut() {
    this._loginService.doLogout();
    this._router.navigate(['/login']);
  }
}

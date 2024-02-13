import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { LoginComponent } from '../../login/login.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
  ],
  providers:[],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}

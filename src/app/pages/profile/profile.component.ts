import { Component, Injectable, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTableModule,
    MatCardActions,
    MatButton,
    CommonModule
  ],
  providers :[LoginService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
@Injectable()
export class ProfileComponent implements OnInit {

  user:any;
  constructor(
    private _loginService : LoginService
  ){}

  ngOnInit() : void{
    this.user = this._loginService.getUserDetails();
  }

}

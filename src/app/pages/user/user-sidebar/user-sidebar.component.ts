import { Component, Injectable } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIcon,
    RouterModule,
    RouterOutlet,
    MatButton,
    CommonModule
  ],
  providers: [CategoryService,LoginService],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
@Injectable()
export class UserSidebarComponent {
  categories = [
    {
      categoryId: '',
      categoryTitle: '',
      categoryDescription: '',
    },
  ];

  constructor(
    private _categoryService: CategoryService,
    private _route :Router,
    private _loginService : LoginService
    ) {}

  ngOnInit():void{
    this._categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error !!", "Error in Loading Category",error);
      }
    );
  }
  public logOut(){
    this._loginService.doLogout();
    this._route.navigate(['/login']);
  }
}

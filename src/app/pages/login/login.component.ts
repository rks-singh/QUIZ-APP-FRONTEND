import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';



@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    NavbarComponent,
    MatIconModule,
    RouterModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  LoginData = {
    userName: '',
    password: '',
  };

  constructor(
    private _snakbar: MatSnackBar,
    private loginService: LoginService,
    private route : Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {

     let current_user:string = 'Ravi Singh';
  
    if (
      this.LoginData.userName.trim() == '' ||
      this.LoginData.userName == null
    ) {
      this._snakbar.open('Username field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.LoginData.password.trim() == '' ||
      this.LoginData.password == null
    ) {
      this._snakbar.open('Password field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }
    console.log(this.LoginData);

    //Request to a server to generate token.
    this.loginService.generateToken(this.LoginData).subscribe(
      (data: any) => {
        // current_user = this.LoginData.userName;
        // console.log("Current User "+current_user);
        console.log(data);
        this.loginService.storeToken(data.token);
        this.loginService.storeUserDetails(data.response);

        //Redirecting to ADMIN Dashboard and User dashboard.
        if(this.loginService.getUserRole() == "ADMIN"){
          //Redirect to Admin Dashboard
          this.route.navigate(['admin'])

        }else if(this.loginService.getUserRole() == "NORMAL"){
          //Redirect to User Dasboard
          this.route.navigate(['user'])

        }else{
          // Do logout
          this.loginService.doLogout();
        }
      },
      (error) => {
        console.log(error);
        this._snakbar.open('Invalid Details Try Again !!', 'OK', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      });
  }
}

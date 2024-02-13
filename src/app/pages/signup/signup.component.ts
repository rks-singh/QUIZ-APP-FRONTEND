import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  providers: [UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public User = {
    userName: '',
    userEmail: '',
    userPhone: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private _snakbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (this.User.userName == '' || this.User.userName == null) {
      this._snakbar.open('Username field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    } else if (this.User.userEmail == '' || this.User.userEmail == null) {
      this._snakbar.open('Useremail field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    } else if (this.User.userPhone == '' || this.User.userPhone == null) {
      this._snakbar.open('Userphone field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    } else if (this.User.password == '' || this.User.password == null) {
      this._snakbar.open('Userpassword filed is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return;
    }

    console.log(this.User);

    this.userService.addUser(this.User).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success', 'Form Submitted Successfully !!', 'success');
      },
      (error) => {
        console.log(error);
        this._snakbar.open('User Already Exist!!', 'OK', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'start',
        });
      }
    );
  }
}

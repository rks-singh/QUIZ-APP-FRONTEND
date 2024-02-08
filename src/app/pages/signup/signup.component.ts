import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../service/user.service';


@Component({
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule,
    HttpClientModule,
  ],
  providers :[UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public User ={
    userName:"",
    userEmail:"",
    userPhone:"",
    password :""
  };

  constructor(private userService : UserService){}

  ngOnInit():void{}

formSubmit() {
  console.log(this.User);

  if(this.User.userName =='' || this.User.userName == null){
    alert('Username field is Required !!');
    return;
  }else if(this.User.userEmail =='' || this.User.userEmail == null){
    alert('Useremail field is Required !!');
    return;
  }else if(this.User.userPhone =='' || this.User.userPhone == null){
    alert('Userphone field is Required !!');
    return;
  }else if(this.User.password =='' || this.User.password == null){
    alert('Userpassword filed is Required !!');
    return;
  }
  
  this.userService.addUser(this.User).subscribe(
    (data)=>{
      console.log(data);
      alert("Successs")
    },
    (error)=>{
      console.log(error);
      alert("Error")
    }
  )
}
}


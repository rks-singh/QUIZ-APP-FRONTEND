import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //Get current logged in user.
  public getLoggedInUser(){
    let user = this.getUserDetails();
    return user.userName;
    // return this.http.get(`${baseUrl}/current-user`)
  }

  // Generationg Token
  public generateToken(loginDetails: any) {
    return this.http.post(`${baseUrl}/login`, loginDetails);
  }

  //Storing token in localstorage for future use.
  public storeToken(token:string){
    localStorage.setItem("token",token);
    return;
  }

  // Storing user details to localstorage
  public storeUserDetails(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //Getting token from localstorage.
  public getToken(){
    return localStorage.getItem("token");
  }

  //Getting UserDetails from localstorage.
  public getUserDetails(){
    let userDetail = localStorage.getItem("user");
    if(userDetail != null){
      return JSON.parse(userDetail);
    }else{
      this.doLogout();
      return null;
    }
  }

  //Getting UserRole
  public getUserRole(){
    let user = this.getUserDetails();
    return user.authority[0];
  }

  //Checking is User is loggedin  or not.
  public checkForLogin(){
    let token = localStorage.getItem("token");
    if(token == undefined || token == '' || token == null){
      return false;
    }else{
      return true;
    }
  }

  //Deleting token and user details from localstorage for logout functionality.
  public doLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
}

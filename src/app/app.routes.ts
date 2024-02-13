import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';


export const routes: Routes = [
    {
        path :"",
        component : DashboardComponent,
        pathMatch : 'full'
    },
    {
        path :'signup',
        component : SignupComponent,
        pathMatch : 'full'
    },
    {
        path :"login",
        component : LoginComponent,
        pathMatch :'full'
    },
    {
        path :"admin",
        component : AdminDashboardComponent,
        children :[
            {
                path : "",
                component : WelcomeComponent
            },
            {
                path : "profile",
                component : ProfileComponent
            }
        ]
    },
    {
        path :"user",
        component : UserDashboardComponent,
        pathMatch : "full",
    }
];

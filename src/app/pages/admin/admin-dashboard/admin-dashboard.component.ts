import { Component, Injectable } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    providers: [],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [
        SidebarComponent,
        RouterOutlet
    ]
})

export class AdminDashboardComponent {

}

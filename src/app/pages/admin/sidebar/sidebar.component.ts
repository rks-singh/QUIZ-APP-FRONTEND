import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIcon,
    RouterModule,
    RouterOutlet,
    MatButton
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}

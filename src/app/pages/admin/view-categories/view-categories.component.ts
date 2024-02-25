import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { CategoryService } from '../../../service/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [
    MatCard,
    MatList,
    MatCard,
    MatIcon,
    MatDivider,
    MatListItem,
    MatButton,
    CommonModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule,
    RouterOutlet
  ],
  providers: [CategoryService],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
@Injectable()
export class ViewCategoriesComponent {
  categories = [
    {
      cid: "" ,
      categoryTitle: '',
      categoryDescription: '',
    },
  ];

  constructor(
    private _categoryService: CategoryService,
    private _snakbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Data !!', error);
      }
    );
  }
}

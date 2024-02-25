import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { CategoryService } from '../../../service/category.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatList,
    MatListItem,
    MatFormField,
    MatCardContent,
    MatLabel,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatButton,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [CategoryService],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
@Injectable()
export class AddCategoryComponent {
  category = {
    categoryTitle: '',
    categoryDescription: '',
  };

  constructor(
    private _category: CategoryService,
    private _snakbar: MatSnackBar
  ) {}

  addCategory() {
    if (this.category.categoryTitle.trim() == '' || this.category.categoryTitle == null) {
      this._snakbar.open('Category Title field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (this.category.categoryDescription == '' || this.category.categoryDescription == null) {
      this._snakbar.open('Category Description field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire("Succes !!","Category Added Successfully !!",'success');
      },
      (error)=>{
        console.log(error);
        this._snakbar.open('Some Error Occured !!', 'OK', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end',
        });
      });
  }
}

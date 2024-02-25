import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSlideToggle,
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { QuizService } from '../../../service/quiz.service';
@Component({
  selector: 'app-add-quiz',
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
    MatSlideToggleModule,
    MatSlideToggle,
    MatSelectModule,
    CommonModule,
  ],
  providers: [CategoryService, QuizService],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
@Injectable()
export class AddQuizComponent {
  categories = [
    {
      categoryId: '',
      categoryTitle: '',
    },
  ];

  quiz = {
    quizTitle: '',
    quizDescription: '',
    maximumMark: '',
    numberOfQuestion: '',
    active: 'true',
    category: {
      categoryId: '',
    },
  };

  constructor(
    private _categoryService: CategoryService,
    private _quizService: QuizService,
    private _snakbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Category', error);
      }
    );
  }

  addQuiz() {
    if (this.quiz.quizTitle.trim() == '' || this.quiz.quizTitle == null) {
      this._snakbar.open('Quiz Title field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    if (
      this.quiz.quizDescription.trim() == '' ||
      this.quiz.quizDescription == null
    ) {
      this._snakbar.open('Quiz Description field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    if (this.quiz.maximumMark.trim() == '' || this.quiz.maximumMark == null) {
      this._snakbar.open('Maximum Mark field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    if (
      this.quiz.numberOfQuestion.trim() == '' ||
      this.quiz.numberOfQuestion == null
    ) {
      this._snakbar.open('Number of Question field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    if (
      this.quiz.category.categoryId == '' ||
      this.quiz.category.categoryId == null
    ) {
      this._snakbar.open('Category field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    this._quizService.createQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Quiz Added Successfully !!', 'success');
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Creating Quiz', error);
      }
    );
  }
}

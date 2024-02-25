import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import { MatOptionModule } from '@angular/material/core';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  MatSlideToggle,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-update-quiz',
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
  providers: [QuizService, CategoryService],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css',
})
@Injectable()
export class UpdateQuizComponent {
  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private _router : Router
  ) {}

  quizid = 0;
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
  categories = [
    {
      categoryId: '',
      categoryTitle: '',
    },
  ];

  ngOnInit(): void {
    //Loading Quiz
    this.quizid = this._route.snapshot.params['quizId'];
    this._quizService.getQuiz(this.quizid).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Quiz', error);
      }
    );

    //Loading Category
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Category', error);
      }
    );
  }

  updateQuiz() {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Update',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quizService.updateQuiz(this.quiz).subscribe(
          (data) => {
            Swal.fire('Successs !!', 'Quiz Updated Successfully !!', 'success').then((route)=>{
              this._router.navigate(['/admin/view-quizzes'])
            });
          },
          (error) => {
            Swal.fire('Error !!', 'Error in Updateing Quiz', error);
          }
        );
      }
    });
  }
}

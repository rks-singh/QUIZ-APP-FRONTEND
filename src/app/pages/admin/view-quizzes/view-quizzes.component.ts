import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
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
    CommonModule,
    RouterModule,
  ],
  providers: [QuizService],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
@Injectable()
export class ViewQuizzesComponent {
  public quizzes = [
    {
      quizId: '',
      quizTitle: '',
      quizDescription: '',
      maximumMark: '',
      numberOfQuestion: '',
      active: '',
      category: {
        categoryTitle: '',
      },
    },
  ];

  constructor(private _quizService: QuizService) {}

  ngOnInit(): void {
    this._quizService.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in loading Quiz !!', error);
      }
    );
  }

  deleteQuiz(quizId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quizService.deleteQuiz(quizId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.quizId != quizId);
            Swal.fire('Success !!', 'Quiz Deleated Successfully !!', 'success');
          },
          (error) => {
            Swal.fire('Error !!', 'Quiz Not Exist !!', error);
          }
        );
      }
    });
  }
}

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
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  MatSlideToggle,
} from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { MatDivider } from '@angular/material/divider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
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
    MatDivider,
    CommonModule,
    RouterModule,
  ],
  providers: [QuestionService],
  templateUrl: './view-quiz-question.component.html',
  styleUrl: './view-quiz-question.component.css',
})
@Injectable()
export class ViewQuizQuestionComponent {
  quizId = 0;
  quizTitle: any;
  questions = [
    {
      questionId: '',
      questionContent: '',
      questionImage: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.quizTitle = this._route.snapshot.params['title'];
    this._questionService.getQuestionOfQuiz(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Questions !!', error);
      }
    );
  }

  deleteQuestion(questionId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.deleteQuestion(questionId).subscribe(
          (data: any) => {
            this.questions = this.questions.filter(
              (question) => question.questionId != questionId
            );
            Swal.fire(
              'Success !!',
              'Question Deleated Successfully !!',
              'success'
            );
          },
          (error) => {
            Swal.fire('Error !!', 'Question Not Exist !!', error);
          }
        );
      }
    });
  }
}

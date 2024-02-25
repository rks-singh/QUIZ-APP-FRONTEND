import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
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
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
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
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [QuestionService],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css',
})
@Injectable()
export class UpdateQuestionComponent {
  questionid: any;
  quizTitle: any;

  question = {
    questionId: '',
    questionContent: '',
    questionImage: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    answer: '',
    quiz: {
      quizId: '',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.questionid = this._route.snapshot.params['questionId'];
    this.quizTitle = this._route.snapshot.params['title'];
    this._questionService.getQuestion(this.questionid).subscribe(
      (data: any) => {
        this.question = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Question !!', error);
      }
    );
  }

  updateQuestion() {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ?',
      confirmButtonText: 'Update',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.updateQuestion(this.question).subscribe(
          (data) => {
            Swal.fire(
              'Successs !!',
              'Question Updated Successfully !!',
              'success'
            ).then((route) => {
              // this._router.navigate(['/admin/view-quizzes']);
            });
          },
          (error) => {
            Swal.fire('Error !!', 'Error in Updateing Question', error);
          }
        );
      }
    });
  }
}

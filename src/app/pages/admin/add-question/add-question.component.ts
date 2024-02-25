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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
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
    CommonModule,
    CKEditorModule,
  ],
  providers: [QuestionService],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
@Injectable()
export class AddQuestionComponent {

  public Editor = ClassicEditor;
  quizId: any = 0;
  quizTitle: any;

  question: any = {
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
    private _snakbar: MatSnackBar,
    private _questionService: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.question.quiz['quizId'] = this.quizId;
  }

  addQuestion() {
    if (
      this.question.questionContent.trim() == '' ||
      this.question.questionContent == null
    ) {
      this._snakbar.open('Question Content field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.question.option_1.trim() == '' ||
      this.question.option_1 == null
    ) {
      this._snakbar.open('Option 1 field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.question.option_2.trim() == '' ||
      this.question.option_2 == null
    ) {
      this._snakbar.open('Option 2 field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.question.option_3.trim() == '' ||
      this.question.option_3 == null
    ) {
      this._snakbar.open('Option 3 field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.question.option_4.trim() == '' ||
      this.question.option_4 == null
    ) {
      this._snakbar.open('Option 4 field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    } else if (
      this.question.answer.trim() == '' ||
      this.question.answer == null
    ) {
      this._snakbar.open('Answer field is Required !!', 'OK', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Are you Sure ?',
      confirmButtonText: 'Add',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._questionService.createQuestion(this.question).subscribe(
          (data: any) => {
            Swal.fire(
              'Success !!',
              'Question Added Successfully!!',
              'success'
            ).then((route) => {
              // this._router.navigate(['/admin/view-quiz-question']);
            });
          },
          (error) => {
            Swal.fire('Error !!', 'Error in adding Question !!', error);
          }
        );
      }
    });
  }
}

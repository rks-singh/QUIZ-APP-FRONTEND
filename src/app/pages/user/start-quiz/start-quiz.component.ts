import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../../service/question.service';
import Swal from 'sweetalert2';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  providers: [QuestionService],
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css',
})
@Injectable()
export class StartQuizComponent {
  quizId: any;

  markGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  questions;
  timer: any;

  constructor(
    private _router: ActivatedRoute,
    private _Location: LocationStrategy,
    private _questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.quizId = this._router.snapshot.params['id'];
    this.preventBackButton();
    this.loadQuestions();
  }

  public loadQuestions() {
    this._questionService.getQuestionOfQuizForTest(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.timerController();
      },
      (error) => {
        Swal.fire('Error !!', 'Error in loading Questions !!', error);
      }
    );
  }

  public preventBackButton() {
    history.pushState(null, location.href);
    this._Location.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  public submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't Submit`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluateQuiz();
      }
    });
  }

  public timerController() {
    let time = window.setInterval(() => {
      if (this.timer == 0) {
        this.evaluateQuiz();
        clearInterval(time);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  public getFormatedTime() {
    let MM = Math.floor(this.timer / 60);
    let SS = this.timer - MM * 60;
    return `${MM} min : ${SS} sec`;
  }

  public evaluateQuiz() {
    this._questionService.evaluateQuiz(this.questions).subscribe(
      (data: any) => {
        this.attempted = data.attempted;
        this.correctAnswers = data.correctAnswers;
        this.markGot = data.markGot;
        this.isSubmit = true;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in Loading Data', error);
      }
    );
  }

  public printResult() {
    window.print();
  }
}

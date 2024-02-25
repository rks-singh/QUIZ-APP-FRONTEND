import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,RouterModule],
  providers: [QuizService,LoginService],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css',
})
@Injectable()
export class LoadQuizComponent {
  cid: any;
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

  constructor(
    private _router: ActivatedRoute,
    private _quizService: QuizService,
    private _loginService : LoginService,
  ) {}

  ngOnInit(): void {
    this.cid = this._router.snapshot.params['cId'];
    this._router.params.subscribe((param) => {
      this.cid = param['cId'];
      if (this.cid == 0) {
        this._quizService.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            Swal.fire('Error !!', 'Error in Loading Quizzes !!', error);
          }
        );
      } else {
        this._quizService.getActiveQuizzesOfCategory(this.cid).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            Swal.fire('Error !!', 'Error in loading Quizzes !!', error);
          }
        );
      }
    });
  }
}

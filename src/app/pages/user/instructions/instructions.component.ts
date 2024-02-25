import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
  ],
  providers:[QuizService],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})

@Injectable()
export class InstructionsComponent {

  quizId:any;

  quiz:any = {
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
    private _router:ActivatedRoute,
    private _quizService:QuizService,
    private _route :Router,
  ){}

  ngOnInit():void{
    this.quizId = this._router.snapshot.params['id'];
    this._quizService.getQuiz(this.quizId).subscribe(
      (data:any)=>{
        this.quiz = data;
      },
      (error)=>{
        Swal.fire("Error !!","Error in Loading Quiz !!",error);
      }
    );
  }

  public startQuiz(){
    Swal.fire({
      title: "Do you want to Start Quiz?",
      showCancelButton: true,
      confirmButtonText: "Start Quiz",
      denyButtonText: `Don't Start`,
      icon :'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this._route.navigate(['/start-quiz/'+this.quizId]);
      } else if (result.isDenied) {
        
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  //Loading Quizzes
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //Creating Quiz
  public createQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/create`, quiz);
  }

  //Deleting Quiz
  public deleteQuiz(quizId: any) {
    return this._http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  //Geting single quiz.
  public getQuiz(quizID: any) {
    return this._http.get(`${baseUrl}/quiz/${quizID}`);
  }

  //Update Quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/update`, quiz);
  }

  //Getting Quizzes of Category.
  public getQuizzesOfCategory(categoryId: any) {
    return this._http.get(`${baseUrl}/quiz/category/${categoryId}`);
  }

  //Getting Active Quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //Getting Active quizzes of category
  public getActiveQuizzesOfCategory(categoryId: any) {
    return this._http.get(`${baseUrl}/quiz/category/active/${categoryId}`);
  }
}

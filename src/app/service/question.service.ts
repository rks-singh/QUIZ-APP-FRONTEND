import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  //Gating question by quiz.
  public getQuestionOfQuiz(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  //Gating question by quiz for test.
  public getQuestionOfQuizForTest(quizId: any) {
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  // Creating Question
  public createQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/create`, question);
  }

  // Getting Question
  public getQuestion(questionId: any) {
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  //Updateing Question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/update`, question);
  }

  //Delete Question
  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //Evaluate-quiz
  public evaluateQuiz(question: any) {
    return this._http.post(`${baseUrl}/question/evaluate-quiz`, question);
  }
}

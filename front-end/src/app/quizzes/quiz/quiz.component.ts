import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {Router } from '@angular/router';
import { RefereeService } from 'src/services/referee.service';
import { RightsService } from 'src/services/rights.service';
import { QuizService } from 'src/services/quiz.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  enableAdmin: boolean;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  questionsQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router: Router,
              private rightsService: RightsService,
              private quizService: QuizService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;
  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'quiz-list') {
      this.router.navigate(['home']);
    }
  }

  play() {
    this.router.navigate(['quiz-list', this.quiz.id], {fragment: 'question'});
    this.quizService.setSelectedQuiz( this.quiz.id);
  }

  delete() {
    if (window.confirm('Etes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.deleteQuiz.emit(this.quiz);
      this.router.navigate(['quiz-list']);
    }
  }

  questions() {
    this.router.navigate(['quiz-list', this.quiz.id, 'questions-list']);
  }

  edit() {

  }
}

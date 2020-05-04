import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  public quizForm: FormGroup;
  public quiz: Quiz;
  public themeList: Theme[] = [];

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private router: Router,
              private route: ActivatedRoute, private themeService: ThemeService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log(this.quiz);
    });
    themeService.themes$.subscribe(themes => {
      this.themeList = themes;
    });

    this.quizForm = this.formBuilder.group({
      name: [''],
      themeId: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  updateQuiz() {
    const quizToEdit: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToEdit);
    if (quizToEdit.name === '') {
      quizToEdit.name = this.quiz.name;
    }

    this.quizService.updateQuiz(this.quiz.id, quizToEdit);
    this.router.navigate(['quiz-list']);
  }

  cancel() {
    this.router.navigate(['quiz-list']);
  }

}

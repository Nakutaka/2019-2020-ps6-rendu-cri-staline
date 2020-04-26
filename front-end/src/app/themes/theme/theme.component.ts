import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Theme } from '../../../models/theme.model';
import {Router } from '@angular/router';
import { RightsService } from 'src/services/rights.service';
import { ThemeService } from '../../../services/theme.service';
import { RefereeService } from '../../../services/referee.service';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  enableAdmin: boolean;

  @Output()
  themeSelected: EventEmitter<Theme> = new EventEmitter<Theme>();

  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(private router: Router, private rightsService: RightsService,
              private refereeService: RefereeService) {
    this.rightsService.rightsSelected$.subscribe((rights) => this.enableAdmin = rights);
    this.enableAdmin = this.rightsService.bEnableAdmin;

  }

  ngOnInit() {
    if (this.enableAdmin === undefined && this.router.url !== 'themes-list') {
      this.router.navigate(['home']);
    }
  }

  delete() {
    this.deleteTheme.emit(this.theme);
    this.router.navigate(['themes-list']);
  }

  quizzes() {
    this.router.navigate(['themes-list', this.theme.id, 'quiz-list']);
  }

  edit() {

  }


}
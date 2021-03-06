import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';
import {Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
import { Result } from 'src/models/result.model';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, public userService: UserService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.results = this.user.results;
      if (this.results.length > 1) {
        console.log('compute');
        this.compute();
      }
    });
  }


  public user: User;

  public url: any;

  public data: number[] = [];
  public results: Result[] = [];
  public labels: Label[] = [];

  public nbLabels = 7;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }
  compute() {

    let dates: Date[];
    dates = [];
    this.results.forEach(element => {
      dates.push(new Date(element.date));
      this.data.push(element.score * 100);
    });
    dates = dates.sort((a, b) => a.getMilliseconds() - b.getMilliseconds());
    for (let i = 0; i < this.nbLabels; i++) {
      this.labels.push(dates[i].toUTCString());
    }
  }




}

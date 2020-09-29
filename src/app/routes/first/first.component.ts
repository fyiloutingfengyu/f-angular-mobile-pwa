import { Component, OnInit } from '@angular/core';
import { FirstService } from './first.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [FirstService]
})
export class FirstComponent implements OnInit {
  public userInfo = {name: '', age: 15};


  constructor(private userService: FirstService, private router: Router) {
  }

  ngOnInit(): void {

  }

  gotoHome(): void {
    console.log(666);
    this.router.navigate(['/'], {queryParams: {id: 1}});
  }

  getData(): void {
    this.userInfo = this.userService.getUserInfo();
  }

  changeData(): void {
    this.userInfo.age++;
  }

}

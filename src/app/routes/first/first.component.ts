import { Component, OnInit } from '@angular/core';
import { FirstService } from './first.service';
import { Router } from '@angular/router';

const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
  }
];

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [FirstService]
})
export class FirstComponent implements OnInit {
  constructor(private userService: FirstService, private router: Router) {
  }

  public userInfo = {name: '', age: 15};

  files = data.slice(0);
  multipleTab = 0;
  color = 'yellow';

  ngOnInit(): void {

  }

  fileChange(params) {
    console.log(params);
    const {files, type, index} = params;
    this.files = files;
  }

  imageClick(params) {
    console.log(params);
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

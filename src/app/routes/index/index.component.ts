import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { RequestService } from '../../common/http/request.service';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexService, RequestService, ToastService]
})
export class IndexComponent implements OnInit {
  flag = true;
  index = 1;
  isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  pageLimit = 20;
  public directionCount = 0;
  page = 0;
  state = {
    refreshState: {
      currentState: 'deactivate',
      drag: false
    },
    direction: '',
    endReachedRefresh: false,
    height: 500,
    data: [],
    directionName: 'both up and down'
  };
  dtPullToRefreshStyle = {height: this.state.height + 'px'};


  data = Array.from(new Array(8)).map((value, i) => ({
    icon: '../../../assets/images/common/logo.png',
    text: `name${i}`
  }));

  constructor(private indexService: IndexService, private toast: ToastService, private $http: RequestService) {
  }

  ngOnInit(): void {
    this.addItems(0);
  }

  onChange(item) {
    console.log('onChange', item);
  }

  onTabClick(item) {
    console.log('onTabClick', item);
  }

  goToPage(event) {
    console.log(event);
  }

  pullToRefresh(event) {
    if (event === 'endReachedRefresh') {
      if (this.page < 9) {
        this.page++;
        this.addItems(this.page * this.pageLimit);
        this.state.refreshState.currentState = 'release';
        setTimeout(() => {
          this.state.refreshState.currentState = 'finish';
        }, 1000);
      }
    } else {
      if (event === 'down') {
        this.state.data = [];
        this.page = 0;
        this.addItems(0);
      } else {
        if (this.page < 9) {
          this.page++;
          this.addItems(this.page * this.pageLimit);
        }
      }
    }
  }

  addItems(startIndex) {
    for (let i = startIndex; i < this.pageLimit * (this.page + 1); i++) {
      this.state.data.push(i);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { dateFormat } from '../../../common/util';

const now = new Date();

@Component({
  selector: 'app-date-search',
  templateUrl: './date-search.component.html',
  styleUrls: ['./date-search.component.scss'],
  providers: [ToastService]
})
export class DateSearchComponent implements OnInit {
  state: any = {
    date: null,
    selectedDate: '',
    show: false,
    pickTime: false,
    now: new Date(),
    rowSize: 'normal',
    showShortcut: false,
    defaultValue: undefined,
    minDate: new Date(+now - 5184000000),
    maxDate: new Date(+now + 31536000000)
  };

  constructor(private toast: ToastService) {
  }

  ngOnInit(): void {

  }

  onClick_1() {
    this.state.show = true;
  }

  triggerCancel() {
    this.state.show = false;
  }

  triggerConfirm(value) {
    console.log(value);
    const {startDate, endDate} = value;
    this.state.date = [startDate, endDate];

    this.triggerCancel();
    console.log('onConfirm', startDate, endDate);
    console.log(this.state.date);
    this.state.selectedDate = dateFormat(startDate, 'yyyy-MM-dd') + ' ~ ' + dateFormat(endDate, 'yyyy-MM-dd');
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
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
  envObj = environment;
  color = 'yellow';
  name = '选择';
  value = new Date();
  form = {
    name: 'test'
  };

  constructor (private indexService: IndexService, private toast: ToastService, private $http: RequestService) {
  }

  ngOnInit (): void {

  }

  currentDateFormat (date, format: string = 'yyyy-mm-dd HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${ n }` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()))
      .replace('ss', pad(date.getSeconds()));
  }

  onOk (result: Date): void {
    this.name = this.currentDateFormat(result);
    this.value = result;
  }

  testFun (): void {
    this.indexService.test(this.form).subscribe(res => {
      // console.log(res);
    });
  }
}

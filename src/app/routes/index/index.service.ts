import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import commonApi from '../../common/api/common';
import { RequestService } from '../../common/http/request.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IndexService {
  heroesUrl = commonApi.getCode.url + '/15011871053';

  constructor (
    private http: RequestService) {
  }

  test (data: any): Observable<any> {
    return this.http.request({
      method: 'get',
      url: this.heroesUrl,
      cancelToken: true,
      isShowLoading: true
    });
  }
}

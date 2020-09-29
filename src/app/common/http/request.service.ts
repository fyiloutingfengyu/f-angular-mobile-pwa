import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from 'ng-zorro-antd-mobile';
import { CommonService } from '../../shared/services/common.service';
import { catchError, map } from 'rxjs/operators';
import { getLocalStorage, removeLocalStorage } from '../../common/util';
import { Router } from '@angular/router';
import { log } from 'util';

// 请求地址
const baseUrl = environment.baseUrl;
const urlArr = {};
let count = 0;

@Injectable()
export class RequestService {
  constructor(private http: HttpClient,
              private toast: ToastService,
              private commonService: CommonService,
              private router: Router
  ) {

  }

  currentUrl = this.router.url;

  // 移除请求缓存
  private removeUrlCache(reqConfig) {
    const url = reqConfig.url;

    // 删除已结束的ajax请求缓存
    if (urlArr[url]) {
      for (const i in urlArr[url]) {
        if (urlArr[url][i] === reqConfig.flag) {
          delete urlArr[url][i];
          break;
        }
      }

      if (Object.keys(urlArr[url]).length === 0) {
        delete urlArr[url];
      }
    }
  }

  // 设置 Content-Type
  private getContentType(type: string) {
    const dataType = type || 'json';

    switch (dataType) {
      case 'form':
        return 'application/x-www-form-urlencoded;charset=utf-8';
      case 'json':
        return 'application/json';
      case 'file':
        return 'multipart/form-data';
      default:
        return 'application/json';
    }
  }

  // 封装公共请求
  public request(reqConfig): Observable<any> {
    const defaultOptions = {
      isRepeatable: false, // 默认请求不可重复
      isShowLoading: true, // 默认添加loading
      isManualDealError: false, // 默认不手动处理后台接口错误
      isManualDealHttpError: false // 默认不手动处理http请求的错误
    };

    const reqOptions = Object.assign({}, defaultOptions, reqConfig);

    const options = {
      headers: {
        'Content-Type': this.getContentType(reqOptions.type),
        Authorization: ''
      }
    };

    // 此处设置额外的头部，token常用于登陆令牌
    if (!reqOptions.cancelToken) {
      const accessToken = getLocalStorage('Authorization');

      if (!accessToken) {
        this.toast.fail('登录后才可以访问哦！', 1000);
        this.commonService.toLogin(this.currentUrl);
      } else {
        options.headers.Authorization = accessToken;
      }
    } else {
      delete options.headers.Authorization;
    }


    // 统一加上服务端前缀
    let url = reqOptions.url;

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = baseUrl + url;
    }

    reqOptions.url = url;

    // 请求不能重复
    if (!reqOptions.isRepeatable) {
      const requestUrl = reqOptions.url;
      const paramsStr = reqOptions.params ? JSON.stringify(reqOptions.params) : '_';

      // url和参数都相同的请求认为是重复提交
      if (urlArr[requestUrl] && urlArr[requestUrl][paramsStr]) {
        return of(); // 返回空，不然代码会报错
      }

      // 缓存ajax url和data
      urlArr[requestUrl] = urlArr[requestUrl] || {};

      const flag = 'req' + (++count);

      urlArr[requestUrl][paramsStr] = flag;
      reqOptions.flag = flag;
    }

    const loadingObj = {
      content: '加载中...',
      duration: 0, // 持续展示 loading
      onClose: null,
      mask: true,
      position: 'middle'
    };

    if (reqOptions.isShowLoading) {
      const loadingConfig = reqOptions.loadingConfig;

      if (loadingConfig) {
        Object.assign(loadingObj, loadingConfig);
      }

      this.toast.loading(loadingObj.content, loadingObj.duration, loadingObj.onClose, loadingObj.mask, loadingObj.position);
    }

    // todo f any
    return this.http.request(reqOptions.method, reqOptions.url, options).pipe(map((res: any) => {
        this.removeUrlCache(reqOptions);
        this.toast.hide();

        if (reqOptions.isManualDealError) {
          // 手动接口返回的处理错误
          return res;
        } else {
          console.log(res);
          // 自动处理接口返回的错误
          switch (res.code) {
            case 200:
              return res;
            default:
              this.toast.fail(res.message, 1000);
              break;
          }
        }
      }),
      catchError((err) => {
          this.removeUrlCache(reqOptions);
          this.toast.hide();

          if (reqOptions.isManualDealHttpError) {
            // 手动处理http请求的错误
            return of(err);
          } else {
            console.log(err);
            // 自动处理http请求的错误
            switch (err.status) {
              case 401: // 未登录、登陆过期
              case 402: // 未登录、登陆过期
                this.toast.fail('身份认证失败,请重新登录！', 1000);
                removeLocalStorage('Authorization');
                this.commonService.toLogin(this.currentUrl);
                break;
              case 500:
                this.toast.fail(err.message);
                break;
              default:
                // 非生产环境，展示服务器返回的真实错误
                if (!environment.production) {
                  this.toast.fail(err.message);
                } else {
                  this.toast.fail('服务异常，请稍后再试！', 1000);
                }
            }

            return of(err);
          }
        }
      )
    );
  }
}

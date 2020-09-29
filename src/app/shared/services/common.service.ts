import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {
  constructor(private injector: Injector) {

  }

  public goTo(url: string, redirectUrl: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url,
      {
        queryParams: {
          redirectUrl
        }
      }
    ));
  }

  public toLogin(redirectUrl: string): void {
    this.goTo('/login', redirectUrl);
  }
}

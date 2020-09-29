import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { FormsModule } from '@angular/forms';
import { RoutesRoutingModule } from './routes-routing.module';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';

@NgModule({
  imports: [
    RoutesRoutingModule,
    FormsModule,
    NgZorroAntdMobileModule
  ],
  declarations: [
    FirstComponent,
    SecondComponent,
    IndexComponent,
    LoginComponent,
    HighlightDirective
  ],
  entryComponents: []
})
export class RoutesModule {
}

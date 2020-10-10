import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { FormsModule } from '@angular/forms';
import { RoutesRoutingModule } from './routes-routing.module';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { BrowserModule } from '@angular/platform-browser';
import { DateSearchComponent } from '../shared/components/date-search/date-search.component';

@NgModule({
  imports: [
    RoutesRoutingModule,
    FormsModule,
    NgZorroAntdMobileModule,
    BrowserModule
  ],
  declarations: [
    FirstComponent,
    SecondComponent,
    IndexComponent,
    LoginComponent,
    HighlightDirective,
    DateSearchComponent
  ],
  entryComponents: []
})
export class RoutesModule {
}

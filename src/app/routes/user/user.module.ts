import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { UserRoutingModule } from './user-routing.module';
import { MyComponent } from './my/my.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    UserRoutingModule,
    NgZorroAntdMobileModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    MyComponent,
    UserInfoComponent
  ],
})
export class UserModule {
}

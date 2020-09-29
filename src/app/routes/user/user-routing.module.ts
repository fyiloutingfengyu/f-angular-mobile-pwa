import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyComponent } from './my/my.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {
    path: 'my',
    component: MyComponent
  },
  {
    path: 'user-info',
    component: UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}

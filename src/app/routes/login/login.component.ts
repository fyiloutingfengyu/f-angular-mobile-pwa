import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  form = {
    userName: '',
    password: ''
  };

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    console.log(loginForm);

    // 手动触发所有表单项的校验
    for (const key of Object.keys(loginForm.form.controls)) {
      loginForm.form.controls[key].markAsDirty();
      loginForm.form.controls[key].updateValueAndValidity();
    }
  }
}

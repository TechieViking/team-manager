import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'pb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup
  public userListArry: any = [];
  public errorUsername: boolean = false;
  constructor(private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.savedMemberList();
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: [''],
      confirmPassword: ['']
    }, { validator: passwordValidator });

    if (location.pathname === '/register') {
      let footer = document.getElementsByTagName("footer")[0];
      let isLoginPage = footer.classList.contains("position-relative");
      console.log('isLoginPage', isLoginPage)
      if (isLoginPage) {
        footer.classList.remove("position-relative");
        footer.classList.add("position-absolute");
      }
      else {
        footer.classList.remove("position-relative");
        footer.classList.add("position-absolute");
      }
    }
  }

  regFormSubmit() {
    let newUsername = this.registerForm.get('userName').value;
    let newPassword = this.registerForm.get('password').value;
    let newUser = { userName: newUsername, password: newPassword, firstTimeUser: true, timestamp: Math.floor(Date.now() / 1000) }
    var totalData = JSON.parse(localStorage.getItem('registerdUsers'))

    try {
      let matchFound = false;
      totalData.filter(function (person) {
        if (newUser['userName'] == person['userName']) {
          this.errorUsername = true;
          matchFound = true;
          return false;
        }
      }.bind(this));
      if (!matchFound) {
        this.userListArry.push(newUser);
        localStorage.setItem('registerdUsers', JSON.stringify(this.userListArry));
        this.route.navigate(['/login']);
      }
    }
    catch {
      console.error('error');
    }
  }

  savedMemberList() {
    var memberLocalStorage = JSON.parse(localStorage.getItem('registerdUsers'))
    if (typeof memberLocalStorage !== 'undefined' && memberLocalStorage !== null) {
      this.userListArry.push(...memberLocalStorage);
    }
  }
  getEventDate(event_date, event_timezone_offset) {
    let d = new Date(event_date);
    let timeCorrection = d.getTimezoneOffset() - event_timezone_offset;
    d.setMinutes(d.getMinutes() + timeCorrection);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} `
      + `${d.getHours()}:${d.getMinutes()}`
  }
}


import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisteredMembersService } from 'src/app/registered-members.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public message = 'Hello from Login';
  public loginForm: FormGroup;
  public registedList = [];
  public error: boolean = false;
  public defaultCredentials: { userName: "user", password: "user" };
  public registeredUsersList: any = [];

  constructor(private fb: FormBuilder,
    private registeredMembersService: RegisteredMembersService,
    private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getMemberList();
    this.registeredUsersList = JSON.parse(this.registeredMembersService.getRegisterdmembers());
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      password: [''],
      rememberme: [false]
    });
    if (location.pathname === '/login') {
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

  formSubmit() {
    let enterdUserName = this.loginForm.get('userName').value;
    let enteredPassword = this.loginForm.get('password').value;

    const source = from(this.registeredUsersList);
    const personDetails = source.pipe(filter(person => person['userName']));
    console.log(this.loginForm.value);

    personDetails.subscribe(val => {
      if (val['userName'] === enterdUserName && val['password'] === enteredPassword) {
        this.authService.login(true);
        this.authService.whologgedIn(val);
        return true;
      } else {
        this.error = true;
        return false;
      }
    });
  }

  getMemberList() {
    let newUser = { userName: 'test', password: 'test' }
    var memberLocalStorage = JSON.parse(localStorage.getItem('registerdUsers'))
    if (typeof memberLocalStorage !== 'undefined' && memberLocalStorage !== null) { }
    else {
      this.registedList.push(newUser);
      localStorage.setItem('registerdUsers', JSON.stringify(this.registedList));
    }
  }

  logout() {
    this.authService.loggedIn.next(true);
    this.route.navigate(['/login']);
  }
} 

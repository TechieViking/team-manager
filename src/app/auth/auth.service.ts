import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/user';

@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isNewUser: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isNavshown() {
    return this.showNav.asObservable();
  }
  get isFirstTime() {
    return this.isNewUser.asObservable();
  }
  constructor(
    private router: Router
  ) { }

  login(user: boolean) {
    this.loggedIn.next(user);
    this.showNav.next(user);
    this.router.navigate(['/profile']);

  }
  whologgedIn(userDetails: any) {
    console.log(userDetails);
    this.isNewUser.next(userDetails);
  }
  logout() {
    this.loggedIn.next(false);
    this.showNav.next(false);
    this.router.navigate(['/login']);
  }
}
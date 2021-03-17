import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisteredMembersService {

  constructor() { }
  public defaultLoginCredentials = {
    'userName': 'Jacky',
    'password': 'Chen'
  }

  getRegisterdmembers() {
    let registerdDbArray = localStorage.getItem('registerdUsers');
    let registerdList = JSON.parse(registerdDbArray);
    return registerdDbArray;
  }
}

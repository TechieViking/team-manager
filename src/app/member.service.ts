import { Injectable, } from '@angular/core';
import { Member } from './model/member';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class MemberService {
  public member: Member;

  constructor(private http: HttpClient) { }

  _url = "http://localhost:4400/members/";

  usersLimit = '?_limit=10';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMemeberListData(): Observable<Member> {
    return this.http.get<any>(`${this._url}${this.usersLimit}`);
  }

  addNewContact(member: Member): Observable<Member> {
    return this.http.post(this._url, member).map(data => data as Member);
  }

  updateMember(member: Member, id: number): Observable<Member> {
    console.log('hi', member)
    return this.http.put(this._url + id, member).map((data: Member) => data as Member);
  }

  deleteMemberData(id: number): Observable<Member> {
    return this.http.delete(this._url + id).map((data: Member) => data as Member);
  }
}


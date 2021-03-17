import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'pb-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  constructor() { }
  member: Member = new Member();
  ngOnInit(): void {
  }

}

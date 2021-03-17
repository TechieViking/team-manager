import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavShown$: Observable<boolean>;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.isNavShown$ = this.authService.isNavshown;
  }
  onLogout() {
    this.authService.logout();
  }
}
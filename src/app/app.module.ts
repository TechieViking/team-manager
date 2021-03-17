import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemebersListComponent } from './components/memebers-list/memebers-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilterPipe } from './filter.pipe';
import { LocationFilterPipe } from './location-filter.pipe';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { GuardPipe } from './auth/guard.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './components/footer/footer.component';



// import { ModalModule } from 'ngx-bootstrap.modal';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard]

  },
  {
    path: 'member-details/:id',
    component: MemberDetailsComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

    MemberDetailsComponent,
    MemebersListComponent,

    FilterPipe,

    LocationFilterPipe,

    GuardPipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule, FormsModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

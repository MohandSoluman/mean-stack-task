import { Routes } from '@angular/router';
import { UserListComponent } from './routes/user-list/user-list.component';
import { UserManagmentComponent } from './routes/user-managment/user-managment.component';
import { LoginComponent } from './routes/login/login.component';
import { SignupComponent } from './routes/signup/signup.component';
import { ForgetPasswordComponent } from './routes/forget-password/forgetPassword.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  {
    path: 'users',
    component: UserListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'user-management',
    component: UserManagmentComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'user-management/:id',
    component: UserManagmentComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

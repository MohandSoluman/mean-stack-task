import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginStart } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _router = inject(Router);
  // private _fb = inject(FormBuilder);
  // private _store = inject(Store);

  // loginForm = this._fb.group({
  //   email: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

  // login() {
  //   if (this.loginForm.valid) {
  //     this.http
  //       .post<{ token: string; user: { name: string; email: string } }>(
  //         'https://your-backend-api.com/login',
  //         this.loginForm.value
  //       )
  //       .subscribe({
  //         next: (response) => {
  //           const { user, token } = response;

  //           // Dispatch login success action
  //           this.store.dispatch(loginSuccess({ user, token }));

  //           // Navigate to the dashboard
  //           this.router.navigate(['/users']);
  //         },
  //         error: () => {
  //           alert('Login failed');
  //         },
  //       });
  //   }
  // }

  signup() {
    this._router.navigateByUrl('/signup');
  }
  login() {
    this._router.navigate(['/users']);
  }
  resetPassword() {
    this._router.navigateByUrl('/forgetPassword');
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ManagementService } from '../services/management-service.service';
import { IUser } from '../../types/user';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputIconModule,
    ToastModule,
    IconFieldModule,
  ],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.css',
  providers: [MessageService],
})
export class UserManagmentComponent implements OnInit {
  userId: string | null = null;
  form!: FormGroup;

  user?: IUser;

  private _route = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _managementService = inject(ManagementService);
  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
    this.userId = this._route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUserById(this.userId);
    }
  }

  getUserById(id: string) {
    this._managementService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue(this.user);
      },
      error: () => {
        this.showError();
      },
    });
  }

  initForm() {
    this.form = this._fb.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      code: ['', Validators.required],
      startName: ['', Validators.required],
      address: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
    });
  }
  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUser = {
      ...this.form.value,
    };

    // Update or create new user
    if (this.userId) {
      this._managementService.updateUser(this.userId, data).subscribe({
        next: () => {
          this.showSuccess('User updated successfully.');
          this.redirectToUsers();
        },
        error: () => {
          this.showError();
        },
      });
    } else {
      this._managementService.addUser(data).subscribe({
        next: () => {
          this.showSuccess('User added successfully.');
          this.redirectToUsers();
        },
        error: () => {
          this.showError();
        },
      });
    }
  }
  discard() {
    this.form.reset();
    this._router.navigateByUrl('/users');
  }

  redirectToUsers() {
    this._router.navigateByUrl('/users').then(() => {
      window.location.reload();
    });
  }

  showError() {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
    });
  }

  showSuccess(message: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
}

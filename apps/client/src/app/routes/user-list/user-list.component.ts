import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ManagementService } from '../services/management-service.service';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [MessageService],
})
export class UserListComponent implements OnInit {
  users = signal<any[]>([]); // All users fetched from the backend
  filteredUsers = signal<any[]>([]); // Filtered users based on the search term
  searchTerm = signal<string>(''); // The current search term

  managementService = inject(ManagementService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Fetch all users from the backend and initialize both users and filteredUsers.
   */
  loadUsers() {
    this.managementService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.filteredUsers.set(users);
      },
      error: () => {
        this.showError('Failed to fetch users. Please try again later.');
      },
    });
  }

  /**
   * Handle search input changes and filter the user list.
   * @param event The input event.
   */
  onSearchChange(event: any) {
    const val = event.target.value as string;
    this.searchTerm.set(val);

    if (val === '') {
      this.filteredUsers.set(this.users());
    } else {
      const filtered = this.users().filter((user) =>
        user.name.toLowerCase().includes(val.toLowerCase())
      );
      this.filteredUsers.set(filtered);
    }
  }

  /**
   * Delete a user by ID after confirming with the user.
   * @param id The ID of the user to delete.
   */
  onDeleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.managementService.deleteUser(id).subscribe({
          next: () => {
            this.showSuccess('User deleted successfully.');
            this.loadUsers(); // Reload the user list
          },
          error: () => {
            this.showError('Failed to delete user. Please try again later.');
          },
        });
      }
    });
  }

  /**
   * Show a success message using PrimeNG's MessageService.
   * @param message The message to display.
   */
  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  /**
   * Show an error message using PrimeNG's MessageService.
   * @param message The message to display.
   */
  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}

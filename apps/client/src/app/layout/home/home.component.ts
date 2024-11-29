import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../routes/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { logout } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  user$!: Observable<{ name: string; email: string } | null>;

  dropdownVisible = false;

  private _router = inject(Router);
  private _elementRef = inject(ElementRef);
  private _store = inject(Store);

  ngOnInit(): void {
    this.user$ = this._store.select(selectUser);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signOut() {
    // Clear user session (e.g., token)
    localStorage.removeItem('authToken');
    this._store.dispatch(logout());
    this._router.navigateByUrl('/login');
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }
}

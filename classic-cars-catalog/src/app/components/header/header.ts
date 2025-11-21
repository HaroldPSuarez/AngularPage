import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  currentUser$: any;
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Inicialización segura
    this.currentUser$ = this.authService.currentUser$;
  }

 ngOnInit(): void {
  this.currentUser$.subscribe((user: any) => {
    this.currentUser = user;
  });
}


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isMenuOpen = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }
}

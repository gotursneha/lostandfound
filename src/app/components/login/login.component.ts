import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  adminForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  showAdminModal = false;
  adminLoading = false;
  adminErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.adminForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(
      this.f['email'].value,
      this.f['password'].value
    ).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password. Please check your credentials or register.';
          this.loading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred. Please try again.';
        this.loading = false;
      }
    });
  }

  showAdminLogin(): void {
    this.showAdminModal = true;
    this.adminErrorMessage = '';
    this.adminForm.reset();
  }

  closeAdminModal(): void {
    this.showAdminModal = false;
    this.adminErrorMessage = '';
    this.adminForm.reset();
  }

  onAdminSubmit(): void {
    this.adminErrorMessage = '';

    if (this.adminForm.invalid) {
      return;
    }

    this.adminLoading = true;
    this.authService.adminLogin(this.adminForm.value.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.adminErrorMessage = error.message || 'Invalid admin password';
        this.adminLoading = false;
      }
    });
  }
}

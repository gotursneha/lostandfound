import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id?: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export interface RegisterResult {
  success: boolean;
  message: string;
  user?: User;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(name: string, email: string, password: string): Observable<RegisterResult> {
    return this.http.post<RegisterResult>(`${this.API_URL}/auth/register`, {
      name,
      email,
      password
    }).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResult>(`${this.API_URL}/auth/login`, {
      email,
      password
    }).pipe(
      map(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  adminLogin(password: string): Observable<boolean> {
    // Admin login with hardcoded credentials
    if (password === 'password123') {
      const adminUser: User = {
        id: 'admin-001',
        email: 'admin@lostandfound.com',
        name: 'Admin',
        isAdmin: true
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.currentUserSubject.next(adminUser);
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.error({ success: false, message: 'Invalid admin password' });
      observer.complete();
    });
  }

  isAdmin(): boolean {
    return this.currentUserValue?.isAdmin === true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => ({ success: false, message: errorMessage }));
  }
}

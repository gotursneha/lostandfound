import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-report-found',
  templateUrl: './report-found.component.html',
  styleUrls: ['./report-found.component.css']
})
export class ReportFoundComponent implements OnInit {
  reportForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  isAdmin = false;

  categories = [
    'Electronics',
    'Documents',
    'Jewelry',
    'Clothing',
    'Bags',
    'Keys',
    'Wallet/Purse',
    'Books',
    'Accessories',
    'Other'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.reportForm = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(5)]],
      contactName: ['', [Validators.required, Validators.minLength(2)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      imageUrl: ['']
    });
  }

  get f() {
    return this.reportForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.reportForm.invalid) {
      return;
    }

    this.loading = true;
    
    const itemData = {
      ...this.reportForm.value,
      type: 'found' as const
    };
    
    this.itemService.reportFoundItem(itemData).subscribe({
      next: (result) => {
        if (result.success) {
          this.successMessage = 'Found item reported successfully! The owner will be notified.';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        } else {
          this.errorMessage = result.message || 'Failed to report item';
          this.loading = false;
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred. Please try again.';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;
  submitted = false;
  showSuccess = false;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Show success message
    this.showSuccess = true;

    // Reset form after 3 seconds
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted = false;
      this.showSuccess = false;
    }, 3000);
  }

  closeSuccess(): void {
    this.showSuccess = false;
    this.contactForm.reset();
    this.submitted = false;
  }
}

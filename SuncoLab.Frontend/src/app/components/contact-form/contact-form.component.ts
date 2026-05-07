import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicFormService } from '../../services/public-form/public-form.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactUsForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service: PublicFormService, 
    private toast: ToastService,
    private router: Router) {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.contactUsForm.invalid) {
      return;
    }
    
    this.service.createContactForm(this.contactUsForm.value)
    .subscribe({
      next: () => {
        this.toast.create("Forma je uspješno poslana! Preusmjeravanje na početnu stranicu...");
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 4000)
      },
      error: () => {
        this.toast.create("Dogodila se greška.", 'error');
      }
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicFormService } from '../../services/public-form/public-form.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactUsForm: FormGroup;

  sending = false;
  /** Nakon uspješnog slanja forma se zamjenjuje zahvalom (umjesto preusmjeravanja na naslovnicu) */
  sent = false;

  // TODO: tekst od klijenta
  readonly tips = [
    { title: 'Želiš pisati?', text: 'Napiši nam nešto o sebi i pošalji link na tekst koji si napisao/la.' },
    { title: 'Najavljuješ koncert?', text: 'Navedi izvođača, datum, mjesto i link na ulaznice.' },
    { title: 'Šalješ glazbu?', text: 'Link na Bandcamp, Spotify ili YouTube je dovoljan - bez privitaka.' },
  ];

  constructor(
    private fb: FormBuilder,
    private service: PublicFormService,
    private toast: ToastService) {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  /** Gumb je uvijek aktivan: klik na neispravnu formu pokaže koja polja treba popraviti */
  submit() {
    if (this.contactUsForm.invalid) {
      this.contactUsForm.markAllAsTouched();
      return;
    }

    this.sending = true;

    this.service.createContactForm(this.contactUsForm.value)
    .subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        this.contactUsForm.reset();
      },
      error: () => {
        this.sending = false;
        this.toast.create("Poruka nije poslana. Pokušaj ponovno za nekoliko trenutaka.", 'error');
      }
    })
  }

  newMessage() {
    this.sent = false;
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { ContactFormFilter } from '../../models/form';

@Injectable({
  providedIn: 'root'
})
export class PublicFormService {

  constructor(private httpSerivce: HttpService) {}
  
  relativeUrl = "/public-form";
  
  createContactForm(form: any) {
    return this.httpSerivce.post(this.relativeUrl + '/contact', form);
  }

  getContactForms(filter: ContactFormFilter) {
    return this.httpSerivce.get(this.relativeUrl + '/contact-forms', filter);
  }
}

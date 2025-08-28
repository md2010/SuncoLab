import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  create(message: string, type: 'success' | 'error' | 'warning' = 'success', duration: number = 3000) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
     toast.classList.add('toast', type);
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}

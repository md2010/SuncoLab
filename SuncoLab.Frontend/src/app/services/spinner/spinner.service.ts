import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  //show() {
  //  this.isLoading.next(true);
  //}
  //hide() {
  //  this.isLoading.next(false);
  //}

  private showTimestamp: number | null = null;
  private hideTimeout: any = null;
  private visible = false;

  private readonly MIN_VISIBLE_DURATION = 300; 

  show() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.showTimestamp = Date.now();

    if (!this.visible) {
      this.visible = true;
       this.isLoading.next(true);
    }
  }


    hide() {
    if (!this.visible || this.showTimestamp === null) {
      return;
    }

    const elapsed = Date.now() - this.showTimestamp;
    const remaining = this.MIN_VISIBLE_DURATION - elapsed;

    if (remaining > 0) {
      this.hideTimeout = setTimeout(() => {
        this.visible = false;
         this.isLoading.next(false);
      }, remaining);
    } else {
      this.visible = false;
       this.isLoading.next(false);
    }

    this.showTimestamp = null;
  }

}

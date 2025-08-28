import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  loading$: Observable<boolean> | undefined;

  constructor(private loaderService: SpinnerService) {}
  
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$; // Subscribe to loading state
  }
}

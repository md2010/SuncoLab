import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { CarouselItem } from '../../models/carouselItem';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  carouselItems: CarouselItem[] | undefined;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getCarousel()
    .subscribe({
      next: (result) => {
        this.carouselItems = result;
      }
    })
  }
}

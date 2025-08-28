import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class SlideComponent implements OnInit {
  //Input items
    slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

    customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      navSpeed: 700,
      navText: ['Prev', 'Next'],
      nav: true,
      items: 1
    };

  ngOnInit(): void {
    this.slides[0] = {
      id: 1,
      src: '/images/forest.jpg'
    };
    this.slides[1] = {
      id: 2,
      src: '/images/forest.jpg'
    };
    this.slides[2] = {
      id: 3,
      src: '/images/northern-lights.jpg'
    };
  }

}

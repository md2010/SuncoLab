import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { CarouselItem } from '../../models/carouselItem';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    carouselBlogs : CarouselItem[] | undefined;

   constructor(private blogService: BlogService) {}

   ngOnInit() {
    
   }
}

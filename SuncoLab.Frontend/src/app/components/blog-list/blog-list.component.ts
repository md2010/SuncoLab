import { Component } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {

    blogs: Array<Blog> | undefined;
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

    constructor(private blogService: BlogService) {}

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

      this.blogService.getAll()
        .subscribe((response) => {
          this.blogs = response;
        })
    }

    openBlog(id: string) {
      const url = `${window.location.origin}/blog-preview/${id}`;
      window.open(url, '_blank');
    }

}

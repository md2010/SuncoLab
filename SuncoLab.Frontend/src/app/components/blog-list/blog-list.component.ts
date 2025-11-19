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

    constructor(private blogService: BlogService) {}

    ngOnInit(): void {
      this.blogService.getAll()
        .subscribe((response) => {
          this.blogs = response;
        })
    }

    openBlog(id: string) {
      const url = `${window.location.origin}/blog-preview/${id}`;
      window.open(url, "_self");
    }

}

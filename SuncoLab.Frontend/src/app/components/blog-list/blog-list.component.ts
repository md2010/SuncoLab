import { Component, Input } from '@angular/core';
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
    @Input() edit : boolean = false;

    constructor(private blogService: BlogService) {}

    ngOnInit(): void {
      this.blogService.getAll()
        .subscribe((response) => {
          this.blogs = response;
        })
    }

    openBlog(id: string) {
      if (this.edit) {
        const url = `${window.location.origin}/blog-edit/${id}`;
        window.open(url, "_blank");
      }
      else {
        const url = `${window.location.origin}/blog-preview/${id}`;
        window.open(url, "_self");
      }
    }

}

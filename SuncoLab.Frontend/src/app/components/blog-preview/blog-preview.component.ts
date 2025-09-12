import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-preview',
  standalone: false,
  templateUrl: './blog-preview.component.html',
  styleUrl: './blog-preview.component.css'
})
export class BlogPreviewComponent implements OnInit {
  blogId!: string;
  blog?: Blog;

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')!;

    this.blogService.getById(this.blogId)
    .subscribe((blog) => {
      this.blog = blog;
    })
  }
}

import { Component, Input } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog';

/** Članak pripremljen za karticu: datum i procjena vremena čitanja računaju se jednom, ne u svakom change detectionu */
interface BlogCard {
  blog: Blog;
  /** ISO datum s 'Z' (backend sprema UTC, ali ga serijalizira bez oznake zone) */
  date?: string;
  minutes: number;
  /** Pomak poderanog ruba, da svaka slika ima drugačiji poder */
  tearOffset: string;
}

const WORDS_PER_MINUTE = 200;

@Component({
  selector: 'app-blog-list',
  standalone: false,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
    /** undefined = još se učitava (prikazuje se skeleton) */
    cards: BlogCard[] | undefined;
    @Input() edit : boolean = false;

    constructor(private blogService: BlogService) {}

    ngOnInit(): void {
      this.blogService.getAll()
        .subscribe({
          next: (response) => {
            this.cards = (response ?? []).map((blog, i) => this.toCard(blog, i));
          },
          error: () => {
            this.cards = [];
          }
        })
    }

    /** Dva najnovija članka su istaknuta na vrhu */
    get featured(): BlogCard[] {
      return this.cards?.slice(0, 2) ?? [];
    }

    get rest(): BlogCard[] {
      return this.cards?.slice(2) ?? [];
    }

    link(blog: Blog): string[] {
      return this.edit ? ['/blog-edit', blog.id] : ['/blog-preview', blog.id];
    }

    private toCard(blog: Blog, i: number): BlogCard {
      const d = blog.dateCreated;
      const words = (blog.body ?? '').replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;

      return {
        blog,
        date: d && !/Z|[+-]\d\d:\d\d$/.test(d) ? d + 'Z' : d,
        minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        tearOffset: `${(i * 173) % 400}px`,
      };
    }
}

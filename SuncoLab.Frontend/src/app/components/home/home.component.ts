import { Component } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { SearchRequest } from '../../models/search';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   public items: Array<any> = [];
  
   constructor(private articleService: ArticleService) {}
}

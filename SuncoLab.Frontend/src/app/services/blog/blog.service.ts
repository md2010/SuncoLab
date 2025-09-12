import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { Blog } from '../../models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpSerivce: HttpService) {}
  
  relativeUrl = "/blog";
  
  createBlog(blog: FormData) {
    return this.httpSerivce.post(this.relativeUrl + '/create', blog);
  }

  getAll() : Observable<Blog[] | undefined> {
    return this.httpSerivce.getAll(this.relativeUrl + '/get-all');
  }

  getById(id: string) : Observable<Blog | undefined> {
    return this.httpSerivce.getById('/blog', id);
  }
}

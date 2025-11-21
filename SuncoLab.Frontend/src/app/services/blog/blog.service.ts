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

  editBlog(id: string, blog: FormData) {
    return this.httpSerivce.put(this.relativeUrl + '/edit/', id, blog);
  }

  getAll() : Observable<Blog[] | undefined> {
    return this.httpSerivce.getAll(this.relativeUrl + '/get-all');
  }

  getById(id: string) : Observable<Blog | undefined> {
    return this.httpSerivce.getById(this.relativeUrl, id);
  }

  delete(id: string) {
    return this.httpSerivce.delete(this.relativeUrl + '/' + id);
  }
}

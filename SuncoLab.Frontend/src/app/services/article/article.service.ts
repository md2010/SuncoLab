import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { SearchRequest } from '../../models/search';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(private httpSerivce: HttpService) {}

  relativeUrl = "/home";

  getItems(params: SearchRequest) {
      return this.httpSerivce.get(this.relativeUrl + '/items', params);
  }
}

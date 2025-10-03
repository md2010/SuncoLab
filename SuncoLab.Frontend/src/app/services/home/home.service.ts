import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { CarouselItem } from '../../models/carouselItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    baseUrl = '/home/'
  
    constructor(private httpService: HttpService) { }

    getCarouselItems() : Observable<CarouselItem[] | undefined> {
      return this.httpService.getAll(this.baseUrl + 'home')
    }

    getMosaicItems() : Observable<CarouselItem[] | undefined> {
      return this.httpService.getAll(this.baseUrl + 'home')
    }
}

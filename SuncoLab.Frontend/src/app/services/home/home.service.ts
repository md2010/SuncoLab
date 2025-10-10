import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { CarouselItem } from '../../models/carouselItem';
import { Observable } from 'rxjs';
import { EditMosaicItem, MosaicItem } from '../../models/mosaicItem';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    baseUrl = '/home/'
  
    constructor(private httpService: HttpService) { }

    getCarousel() : Observable<CarouselItem[] | undefined> {
      return this.httpService.getAll(this.baseUrl + 'home')
    }

    getMosaic() : Observable<MosaicItem[] | undefined> {
      return this.httpService.getAll(this.baseUrl + 'get-mosaic')
    }

    editMosaic(mosaic: any)  {
      return this.httpService.post(this.baseUrl + 'edit-mosaic', mosaic)
    }
}

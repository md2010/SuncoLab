import { Injectable } from '@angular/core';
import { HttpService } from '../htpp/http.service';
import { Album } from '../../models/album';
import { Observable } from 'rxjs';
import { Image } from '../../models/image';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
    baseUrl = '/gallery/'

  constructor(private httpService: HttpService) { }

  saveFiles(data: FormData) {
    return this.httpService.post<boolean>(this.baseUrl + 'upload-multiple', data);
  }

  createAlbum(data: FormData) {
    return this.httpService.post<boolean>(this.baseUrl + 'insert-album', data);
  }

  getAllAlbums() : Observable<Album[] | undefined> {
    return this.httpService.getAll(this.baseUrl + 'albums')
  }

  getImagesForAlbum(albumId: string) : Observable<Image[] | undefined> {
    return this.httpService.getAll(this.baseUrl + 'images/' + albumId)
  }

  getImagesForMosaic() : Observable<Image[] | undefined> {
    return this.httpService.getAll(this.baseUrl + 'mosaic-images')
  }

  setCoverImage(albumId: string, imageId: string) {
    return this.httpService.post<boolean>(this.baseUrl + 'set-cover-image', { "albumId": albumId, "imageId": imageId})
  }

  showOnHomePage(imageId: string, show: boolean) {
    return this.httpService.post<boolean>(this.baseUrl + 'show-on-home-page', { "show": show, "imageId": imageId})
  }

  deleteImage(fileId: string) : Observable<boolean> {
    return this.httpService.delete(this.baseUrl + 'delete-image/' + fileId)
  }
}

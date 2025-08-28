import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedResponse, SearchRequest } from '../../models/search';
import { AuthService } from '../auth/auth.service';
import { Authorized } from '../../models/authorization';

@Injectable({
  providedIn: 'root',
})

export class HttpService {
  public baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  create<T>(url: string, item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, item);
  }

  post<T>(url: string, data: any, options? : { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data, { headers: this.generateHttpHeaders() });
  }

  get<T>(url: string, searchRequest: SearchRequest | null): Observable<PaginatedResponse<T>> { 
    if (searchRequest == null) {
      return this.http.get<PaginatedResponse<T>>(this.baseUrl + url, {
        headers: this.generateHttpHeaders()
      });  
    }
    return this.http.get<PaginatedResponse<T>>(this.baseUrl + url, {
      headers: this.generateHttpHeaders(),
      params: this.generateHttpParams(searchRequest),
    });
  }

  getAll<T>(url: string): Observable<T[]> {
     return this.http.get<T[]>(this.baseUrl + url, {
        headers: this.generateHttpHeaders()
      });
  }

  getById<T>(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  delete(url: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}${url}`, {
      headers: this.generateHttpHeaders()
    });
  }

  generateHttpParams(searchRequest: SearchRequest) : HttpParams {
    const params = new HttpParams()
    .set('pageNumber', searchRequest.pageNumber.toString())
    .set('pageSize', searchRequest.pageSize.toString());

    return params;
  }

  generateHttpHeaders() {
    const headers = new HttpHeaders()
    .set('Accept', 'application/json');

    var token = sessionStorage.getItem("token");
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmsService {
  BASE_URL: string = 'https://afternoon-taiga-01182.herokuapp.com';
  constructor(private _http: HttpClient) {}

  confirm(confirmUrl): Observable<any> {
    return this._http.get(`${this.BASE_URL}${confirmUrl}`);
  }
}

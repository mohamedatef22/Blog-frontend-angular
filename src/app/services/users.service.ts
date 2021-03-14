import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASE_URL: string = 'https://afternoon-taiga-01182.herokuapp.com/api/users/';
  constructor(private _http: HttpClient) {}

  register(user: User): Observable<any> {
    return this._http.post(`${this.BASE_URL}/register`, user);
  }

  login(form): Observable<any> {
    return this._http.post(`${this.BASE_URL}/login`, form);
  }
}

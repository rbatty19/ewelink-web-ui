import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AuthLogin from '../models/authLogin';
import { DataLogin } from '../models/data_login';
import { tap } from 'rxjs/operators';
import { ResponseData } from '../models/response';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginAuth(auth: AuthLogin): Observable<ResponseData<DataLogin>> {
    return this.http.post<ResponseData<DataLogin>>(environment.urlBase + '/login', auth).pipe(
      tap(res => localStorage.setItem('data', JSON.stringify(res.data))),
    );
  }

}

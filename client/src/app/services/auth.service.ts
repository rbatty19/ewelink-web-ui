import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import AuthLogin from '../models/authLogin';
import { Data } from '../models/data';
import { catchError, map, tap }  from  'rxjs/operators';
import { ResponseData } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  loginAuth(auth: AuthLogin): Observable<ResponseData<Data>> {
    return this.http.post<ResponseData<Data>>(environment.urlBase + '/login', auth).pipe(
      tap(res => localStorage.setItem('data', JSON.stringify(res.data))),
    );
  }

}

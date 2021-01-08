import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AuthLogin from '../models/authLogin';
import { Data } from '../models/data';
import { map, tap }  from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  loginAuth(auth: AuthLogin): Observable<Data> {
    return this.http.post<any>(environment.urlBase + '/login', auth).pipe(
      map(res => res.data),
      tap(res => localStorage.setItem('data', JSON.stringify(res)))
    );
  }

}

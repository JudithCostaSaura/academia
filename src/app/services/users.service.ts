import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  // connect with backend
  urlUsers = 'http://localhost:3000/users';

  // getAll
  getAllData():Observable<any>{
    return this._http.get(`${this.urlUsers}`);
  }


}

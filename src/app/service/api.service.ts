import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configserver } from '../configserver';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private server: Configserver) { }

  //Getting Users as per search key
  public getUserName<T>(userName: String): Observable<T> {
    return this.http.get<T>(this.server.serverUrl + 'search/users?q=' + userName);
  }

  //Getting User Details
  public getUserData<T>(userName: String): Observable<T> {
    return this.http.get<T>(this.server.serverUrl + 'users/' + userName);
  }

  //Getting User Repository
  public getUserRepo<T>(userName: String): Observable<T> {
    return this.http.get<T>(this.server.serverUrl + 'users/' + userName + '/repos');
  }

}

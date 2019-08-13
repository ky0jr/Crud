import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Policy} from './policies.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) { }

  read(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${this.api}/api/read.php`);
  }

  create(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(`${this.api}/api/create.php`, policy);
  }

  update(policy: Policy) {
    return this.http.put<Policy>(`${this.api}/api/update.php`, policy);
  }

  delete(id: number) {
    return this.http.delete<Policy>(`${this.api}/api/delete.php/?id=${id}`);
  }
}

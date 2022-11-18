import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
};

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  private dockerUrl = 'http://localhost:8080';
  users: IUser | any;
  usersChanged = new Subject<IUser[]>();

  constructor(private http: HttpClient) {}

  getData(page: number, limit: number): Observable<HttpResponse<IUser>> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('_page', page);
    searchParams = searchParams.append('_limit', limit);
    let headers = new HttpHeaders().set('Bearer', '');
    return this.http.get<IUser>(this.usersUrl + '/users', {
      observe: 'response',
      params: searchParams,
      headers: headers,
    });
  }

  getUsersDocker(): Observable<HttpResponse<IUser>> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });

    console.log(userData.token);
    // if (!token) {
    //   return;
    // }
    return this.http.get<IUser>(`${this.dockerUrl}/api/users`, {
      observe: 'response',
      headers: headers,
    });
  }

  getUser(id: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(this.usersUrl + '/users/' + id, {
      observe: 'response',
    });
  }

  setData(users: IUser[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  postData(users: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.usersUrl + '/users', users, httpOptions);
  }

  getUsers() {
    // this.showData();
    //console.log('2'+this.users);
    return this.users.slice();
  }

  findUser(id: number) {
    const user = this.users.find((u) => {
      return u.id === id;
    });
    return user;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
   activeUser: User;
 // url = 'http://localhost:8000/users';
  //activeUser$: Subject<User> = new Subject<User>()


  /*getUsers()
  {
    return this.http.get<User[]>(this.url);
  }

  get(uid: string)
  {
    return this.http.get<any>(this.url + '/' + uid);
  }*/



}

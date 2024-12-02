import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = '/usuario'; 

  constructor(private api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.endpoint); 
  }

  getUser(id: number): Observable<User> {
    return this.api.get<User>(`${this.endpoint}/${id}`); 
  }

  createUser(user: User): Observable<User> {
    return this.api.post<User>(this.endpoint, user); 
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`); 
  }

  updateUser(user: User): Observable<User> {
    return this.api.put<User>(`${this.endpoint}/${user.idUsuario}`, user); 
  }
}
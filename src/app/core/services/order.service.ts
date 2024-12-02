import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly endpoint = '/orden'; // Endpoint base

  constructor(private api: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>(this.endpoint); 
  }

  createOrder(order: Order): Observable<Order> {
    return this.api.post<Order>(this.endpoint, order); 
  }

  deleteOrder(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`); 
  }
}

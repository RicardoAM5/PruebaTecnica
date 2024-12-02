import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly endpoint = '/producto'; 

  constructor(private api: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.api.get<Product[]>(this.endpoint); 
  }

  getProduct(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.endpoint}/${id}`); 
  }
}

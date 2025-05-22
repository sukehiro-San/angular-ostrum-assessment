import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([]);
  products = this._products.asReadonly();
  private _baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http
      .get<Product[]>(this._baseUrl + '/api/products')
      .subscribe((res) => this._products.set(res));
  }

  addProduct(product: Partial<Product>) {
    return this.http.post<Product>(this._baseUrl + '/api/products', product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      this._baseUrl + `/api/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number) {
    this.http.delete(this._baseUrl + `/api/products/${id}`).subscribe((res) => {
      this.loadProducts();
    });
  }
}

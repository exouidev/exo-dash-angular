import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from './products.model';
import { MOCK_PRODUCTS } from './products-mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = [...MOCK_PRODUCTS];

  getProducts(): Observable<Product[]> {
    return of([...this.products]).pipe(delay(300));
  }

  saveProduct(productData: Partial<Product>, editId: string | null): Observable<Product> {
    if (editId) {
      let updatedProduct: Product | undefined;
      this.products = this.products.map(p => {
        if (p.id === editId) {
          updatedProduct = { ...p, ...productData } as Product;
          return updatedProduct;
        }
        return p;
      });
      if (!updatedProduct) throw new Error('Product not found');
      return of(updatedProduct).pipe(delay(200));
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substring(2, 9),
        name: productData.name || '',
        sku: productData.sku || '',
        category: productData.category || 'Electronics',
        price: productData.price || 0,
        stock: productData.stock || 0,
        status: productData.status || 'Draft',
        image: ''
      };
      this.products = [newProduct, ...this.products];
      return of(newProduct).pipe(delay(200));
    }
  }

  deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id !== id);
    return of(true).pipe(delay(200));
  }
}

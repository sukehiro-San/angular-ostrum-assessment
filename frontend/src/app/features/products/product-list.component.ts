import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProductPopupComponent } from './add-product.component';
import { DeleteProductComponent } from './delete-product.component';
import { Product, ProductService } from './product.service';
import { UpdateProductComponent } from './update-product.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AddProductPopupComponent,
    UpdateProductComponent,
    DeleteProductComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  logout() {
    this.auth.logout();
  }
  closePopup(popupType?: any) {
    this.showPopup.set(false);
    switch (popupType) {
      case 'add': {
        this.loadProducts();
        break;
      }
      case 'update': {
        this.loadProducts();
        break;
      }
      case 'delete': {
        this.service.deleteProduct(this.selectedProduct.id);
        console.log('delete');
        break;
      }
      default:
        break;
    }
  }
  products!: Signal<Product[]>;
  showPopup = signal(false);
  popupType = signal<'add' | 'update' | 'delete'>('add');
  selectedProduct!: Product;

  constructor(private service: ProductService, private auth: AuthService) {}

  ngOnInit() {
    this.products = this.service.products;
    this.loadProducts();
  }

  loadProducts() {
    this.service.loadProducts();
    this.products = this.service.products;
  }

  delete(id: number) {
    this.service.deleteProduct(id);
  }

  openPopup(popupType: 'add' | 'update' | 'delete', product?: Product) {
    this.popupType.set(popupType);
    if (product) {
      this.selectedProduct = product;
    }
    this.showPopup.set(true);
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}

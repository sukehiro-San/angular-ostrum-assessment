import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="custom-popup-backdrop" (click)="closePopup()">
      <div class="custom-popup-content" (click)="$event.stopPropagation()" tabindex="0">
        <button class="custom-popup-close" (click)="closePopup()" aria-label="Close">&times;</button>
        <h2>Add New Product</h2>
        <form (ngSubmit)="addProduct()" #form="ngForm" autocomplete="off">
          <input
            type="text"
            name="product-name"
            [(ngModel)]="product.name"
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="product-price"
            [(ngModel)]="product.price"
            placeholder="Product Price"
            required
            min="0"
          />
          <input
            type="text"
            name="product-category"
            [(ngModel)]="product.category"
            placeholder="Product Category"
            required
          />
          <textarea
            name="product-description"
            [(ngModel)]="product.description"
            placeholder="Write product description here.."
            required
          ></textarea>
          <div class="popup-form-actions">
            <button type="submit" [disabled]="form.invalid">Add Product</button>
            <button type="reset" (click)="resetForm()">Reset</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .custom-popup-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.36);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
    }
    .custom-popup-content {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(31,38,135,0.22);
      min-width: 340px;
      max-width: 90vw;
      padding: 2.5rem 2rem 1.5rem 2rem;
      position: relative;
      animation: popup-in 0.25s cubic-bezier(.23,1.01,.32,1) both;
      outline: none;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      text-align: left;
    }
    .custom-popup-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #888;
      z-index: 1;
    }
    .custom-popup-close:hover {
      color: #222;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.4rem;
      color: #222;
      font-weight: 600;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input, textarea {
      padding: 0.7rem 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      background: #f7f7f7;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, textarea:focus {
      border-color: #4f8cff;
    }
    textarea {
      min-height: 80px;
      resize: vertical;
    }
    .popup-form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    button[type='submit'] {
      background: #4f8cff;
      color: #fff;
      border: none;
      padding: 0.8rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button[type='submit']:hover {
      background: #2563eb;
    }
    button[type='reset'] {
      background: #e0e7ef;
      color: #4f4f4f;
      border: none;
      padding: 0.8rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      margin-left: 0.5rem;
      transition: background 0.2s;
    }
    button[type='reset']:hover {
      background: #c9d6e6;
    }
    @keyframes popup-in {
      from { transform: translateY(40px) scale(0.96); opacity: 0; }
      to   { transform: translateY(0) scale(1); opacity: 1; }
    }
  `]
})
export class AddProductPopupComponent {
  @Output() close = new EventEmitter();

  product: Partial<Product> = {
    name: '',
    description: '',
    price: undefined,
    category: '',
  };

  constructor(private service: ProductService) {}

  addProduct() {
    this.service.addProduct(this.product).subscribe(() => {
      this.close.emit('add');
    });
  }

  closePopup() {
    this.close.emit();
  }

  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: undefined,
      category: '',
    };
  }
}

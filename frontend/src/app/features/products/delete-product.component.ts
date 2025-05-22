import { A11yModule } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.service';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [A11yModule],
  template: `
    <div class="custom-popup-backdrop" (click)="cancel()">
      <div
        class="custom-popup-content"
        (click)="$event.stopPropagation()"
        tabindex="0"
      >
        <button
          class="custom-popup-close"
          (click)="cancel()"
          aria-label="Close"
        >
          &times;
        </button>
        <div
          class="popup-form-container"
          cdkTrapFocus
          cdkTrapFocusAutoCapture="true"
        >
          <h2 tabindex="-1" cdkFocusInitial>Delete Product</h2>
          <p class="confirm-message">
            Are you sure you want to delete
            <b>{{ product?.name || 'this product' }}</b
            >?
          </p>
          <div class="popup-form-actions">
            <button type="button" class="danger" (click)="confirm()">
              Delete
            </button>
            <button type="button" (click)="cancel()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .custom-popup-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.36);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
      }

      .custom-popup-content {
        background: rgba(255, 255, 255, 0.18);
        border-radius: 20px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        min-width: 340px;
        max-width: 90vw;
        padding: 0;
        position: relative;
        animation: popup-in 0.25s cubic-bezier(0.23, 1.01, 0.32, 1) both;
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }

      .custom-popup-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        font-size: 1.7rem;
        cursor: pointer;
        color: #888;
        z-index: 1;
        transition: color 0.2s;
      }
      .custom-popup-close:hover {
        color: #222;
      }

      .popup-form-container {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        padding: 2.5rem 2rem 1.5rem 2rem;
        margin: 0;
        min-width: 340px;
        max-width: 90vw;
        width: 100%;
        text-align: center;
        animation: popup-in 0.25s cubic-bezier(0.23, 1.01, 0.32, 1) both;
      }

      @keyframes popup-in {
        from {
          transform: translateY(40px) scale(0.96);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }

      .popup-form-container h2 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-size: 1.4rem;
        color: #222;
        font-weight: 600;
      }

      .confirm-message {
        margin: 1.2rem 0 2rem 0;
        font-size: 1.08rem;
        color: #333;
      }

      .popup-form-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
      }
      .popup-form-actions button {
        padding: 0.8rem 1.6rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
      }
      .popup-form-actions .danger {
        background: #ef4444;
        color: #fff;
      }
      .popup-form-actions .danger:hover {
        background: #b91c1c;
      }
      .popup-form-actions button:not(.danger) {
        background: #e0e7ef;
        color: #4f4f4f;
      }
      .popup-form-actions button:not(.danger):hover {
        background: #c9d6e6;
      }
    `,
  ],
})
export class DeleteProductComponent {
  @Input() product?: Product;
  @Output() close = new EventEmitter();

  confirm() {
    this.close.emit('delete');
  }
  cancel() {
    this.close.emit();
  }
}

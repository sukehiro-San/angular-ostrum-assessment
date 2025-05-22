import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { productsGuard } from './core/guards/products.guard';
// import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canMatch: [loginGuard],
    loadComponent: () => import('./core/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'products',
    canMatch: [productsGuard],
    loadComponent: () => import('./features/products/product-list.component').then(m => m.ProductListComponent)
  },
];
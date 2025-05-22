import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const productsGuard: CanMatchFn = (route, segments) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

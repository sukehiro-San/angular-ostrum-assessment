import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const loginGuard: CanMatchFn = (route, segments) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.isLoggedIn()) {
    return false;
  }
  router.navigate(['/products']);
  return true;
};

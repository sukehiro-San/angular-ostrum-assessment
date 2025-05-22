import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { productsGuard } from './products.guard';

describe('productsGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => productsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

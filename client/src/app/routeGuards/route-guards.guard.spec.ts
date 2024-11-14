import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isUserLoggedInGuard } from './isUserLoggedIn.guard';

describe('routeGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      isUserLoggedInGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

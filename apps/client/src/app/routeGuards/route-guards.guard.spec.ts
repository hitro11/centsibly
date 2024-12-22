import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { SignedInGuard } from './signed-in.guard';

describe('routeGuardsGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => SignedInGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});

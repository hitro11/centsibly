import { router } from './../../../../server/src/api/routes/index';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BudgetService } from '../setup-account-container/services/budget/budget.service';

export const IsSetupCompleteGuard: CanActivateFn = async (route, state) => {
    const budgetService = inject(BudgetService);
    const router = inject(Router);
    const isSetupComplete = await budgetService.hasUserCompletedSetup();
    console.log({ isSetupComplete });

    if (!isSetupComplete) {
        return true;
    }

    router.navigate(['/dashboard']);
    return false;
};

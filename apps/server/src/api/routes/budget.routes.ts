import { Router, Response, Request, NextFunction } from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import { Budget, BudgetSchema } from '@centsibly/utils/schemas';
import { BudgetController } from '../controllers/budget.controller.js';
import { createHttpResponse } from '@centsibly/utils/utils';
import { WithId } from 'mongodb';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const budgets: WithId<Budget>[] =
            await BudgetController.getBudgets(req);
        res.json(createHttpResponse('success', budgets, null));
    } catch (error) {
        next(error);
    }
});

router.post(
    '/',
    validateData(BudgetSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await BudgetController.addBudget(req);
            res.json();
        } catch (error) {
            next(error);
        }
    }
);

export const budgetRoutes: Router = router;

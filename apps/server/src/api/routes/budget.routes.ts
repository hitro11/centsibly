import { Router, Response, Request, NextFunction } from 'express';
import { Budget } from '@centsibly/utils/schemas';
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

router.get(
    '/current',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const budget: WithId<Budget> | null =
                await BudgetController.getCurrentBudget(req);
            res.json(createHttpResponse('success', budget, null));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await BudgetController.addBudget(req);
        res.json(createHttpResponse('success', null, null, null));
    } catch (error) {
        next(error);
    }
});

export const budgetRoutes: Router = router;

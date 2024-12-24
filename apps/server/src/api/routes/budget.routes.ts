import { Router, Response, Request, NextFunction } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { validateData } from '../middleware/validation.middleware.js';
import { BudgetSchema } from '@centsibly/utils/schemas';
import { BudgetController } from '../controllers/budget.controller.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = await UserController.getAccount(req, res);
        res.json(userInfo);
    } catch (error) {
        next(error);
    }
});

router.post(
    '/',
    validateData(BudgetSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const budget = req.body;
            await BudgetController.addBudget(req, budget);
            res.json();
        } catch (error) {
            next(error);
        }
    }
);

export const budgetRoutes: Router = router;

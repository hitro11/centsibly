import { Router, Response, Request, NextFunction } from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import { TransactionSchema } from '@centsibly/utils/schemas';
import { TransactionController } from '../controllers/transaction.controller.js';

const router = Router();

// router.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const budgets = await TransactionController.(req);
//         res.json(budgets);
//     } catch (error) {
//         next(error);
//     }
// });

router.post(
    '/',
    validateData(TransactionSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await TransactionController.addTransaction(req);
            res.json();
        } catch (error) {
            next(error);
        }
    }
);

export const transactionRoutes: Router = router;

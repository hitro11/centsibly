import { Router, Response, Request, NextFunction } from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import { Transaction, TransactionSchema } from '@centsibly/utils/schemas';
import { TransactionController } from '../controllers/transaction.controller.js';
import { WithId } from 'mongodb';
import { createHttpResponse } from '@centsibly/utils/utils';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transactions: WithId<Transaction>[] =
            await TransactionController.getTransactions(req);
        res.json(createHttpResponse('success', transactions, null));
    } catch (error) {
        next(error);
    }
});

router.post(
    '/',
    validateData(TransactionSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await TransactionController.addTransaction(req);
            res.json(createHttpResponse('success', null, null));
        } catch (error) {
            next(error);
        }
    }
);

export const transactionRoutes: Router = router;

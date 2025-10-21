import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { TransactionService } from '../services/transaction.service.server.js';
import { getCurrentYearMonth } from '@centsibly/utils/utils';
import { YearMonth } from '@centsibly/utils/schemas';
import { BudgetService } from '../services/budget.service.js';

export class TransactionController {
    static async addTransaction(req: Request) {
        try {
            const email = await UserService.getEmail(req);

            if (!email) {
                throw new Error('Email not found');
            }

            const transaction = req.body;
            await TransactionService.addTransaction(email, transaction);
            await BudgetService.updateBudgetActualsAfterTransaction(email, [
                transaction,
            ]);
        } catch (error) {
            throw error;
        }
    }

    static async getTransactions(req: Request) {
        try {
            const email = await UserService.getEmail(req);
            const from = (req.query['from'] ??
                getCurrentYearMonth()) as YearMonth;
            const to = (req.query['to'] ?? getCurrentYearMonth()) as YearMonth;

            if (!email) {
                throw new Error('Email not found');
            }

            const transactions = await TransactionService.getTransactions(
                email,
                from,
                to
            );

            return transactions;
        } catch (error) {
            throw error;
        }
    }
}

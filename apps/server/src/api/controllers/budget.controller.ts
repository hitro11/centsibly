import { Request } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { BudgetService } from '../services/budget.service.js';
import { Budget, YearMonth } from '@centsibly/utils/schemas';
import { WithId } from 'mongodb';
import { getCurrentYearMonth } from '@centsibly/utils/utils';

export class BudgetController {
    static async createBudget(req: Request) {
        const email = await UserService.getEmail(req);
        const yearMonth = req.body.yearMonth ?? getCurrentYearMonth();
        return await BudgetService.createBudget(email, yearMonth);
    }

    static async getBudgets(req: Request): Promise<WithId<Budget>[]> {
        const email = await UserService.getEmail(req);

        if (!email) {
            throw new Error('Email not found');
        }

        const from = req.query.from as YearMonth;
        const to = req.query.to as YearMonth;

        return await BudgetService.getBudgetsInTimeRange(email, from, to);
    }

    static async getCurrentBudget(
        req: Request
    ): Promise<WithId<Budget> | null> {
        const email = await UserService.getEmail(req);

        if (!email) {
            throw new Error('Email not found');
        }

        return await BudgetService.getCurrentBudget(email);
    }
}

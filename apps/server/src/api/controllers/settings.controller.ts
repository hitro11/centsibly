import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { BudgetService } from '../services/budget.service.js';
import { Budget, YearMonth } from '@centsibly/utils/schemas';
import { WithId } from 'mongodb';

export class SettingsController {
    static async getSettings(req: Request): Promise<{}> {
        try {
            const email = await UserService.getEmail(req);

            if (!email) {
                throw new Error('Email not found');
            }

            if (req.query.current) {
                return await BudgetService.getLatestBudget(email);
            }

            const from = req.query.from as YearMonth;
            const to = req.query.to as YearMonth;

            return await BudgetService.getBudgets(email, from, to);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

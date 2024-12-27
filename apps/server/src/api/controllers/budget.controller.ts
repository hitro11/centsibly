import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { BudgetService } from '../services/budget.service.js';
import { Budget } from '@centsibly/utils/schemas';
import { getCurrentMonthandYear } from '@centsibly/utils/utils';

export class BudgetController {
    static async addBudget(req: Request) {
        try {
            const email = await UserService.getEmail(req);

            if (!email) {
                throw new Error('Email not found');
            }

            const budget = req.body;
            return await BudgetService.addBudget(email, budget);
        } catch (error) {
            throw error;
        }
    }

    static async getBudgets(req: Request) {
        try {
            const email = await UserService.getEmail(req);

            if (!email) {
                throw new Error('Email not found');
            }

            let month = null;

            if (req.query.latest) {
                month = getCurrentMonthandYear();
            } else if (req.query.month) {
                month = req.query.month as string;
            }

            return month
                ? await BudgetService.getBudget(email, month)
                : await BudgetService.getAllBudgets(email);
        } catch (error) {
            throw error;
        }
    }
}

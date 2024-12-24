import { logger } from '../../config/logger.js';
import { Budget } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { WithId } from 'mongodb';

export class BudgetService {
    static async addBudget(email: string, budget: Budget) {
        try {
            email = email.toLowerCase();
            logger.debug(email, budget);
            const budgetsCollection = (await database()).collection(
                COLLECTIONS.BUDGETS
            );

            const budgetExists = !!(await budgetsCollection.countDocuments(
                { email, month: budget.month },
                { limit: 1 }
            ));

            if (budgetExists) {
                await budgetsCollection.updateOne(
                    { email, month: budget.month },
                    [
                        { $set: { month: budget.month } },
                        { $set: { currency: budget.currency } },
                        { $set: { income: budget.income } },
                        { $set: { expenses: budget.expenses } },
                    ]
                );
            } else {
                await budgetsCollection.insertOne({
                    email,
                    month: budget.month,
                    currency: budget.currency,
                    income: budget.income,
                    expenses: budget.expenses,
                });
            }
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async getBudget(email: string, month: string) {
        try {
            const budgetsCollection = (await database()).collection(
                COLLECTIONS.BUDGETS
            );

            const budget = await budgetsCollection.findOne({
                email: email.toLowerCase(),
                month,
            });

            return budget ?? null;
        } catch (error) {
            throw error;
        }
    }

    static async getAllBudgets(email: string) {
        try {
            const budgetsCollection = (await database()).collection(
                COLLECTIONS.BUDGETS
            );

            const budgets = await budgetsCollection
                .find({
                    email: email.toLowerCase(),
                })
                .toArray();

            logger.debug(budgets);
            return budgets;
        } catch (error) {
            throw error;
        }
    }
}

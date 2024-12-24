import { logger } from '../../config/logger.js';
import supertokens from 'supertokens-node';
import { SessionRequest } from 'supertokens-node/framework/express';
import { Budget } from '@centsibly/utils/schemas';
import { getDb } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';

export class BudgetService {
    static async addBudget(email: string, budget: Budget) {
        try {
            email = email.toLowerCase();
            logger.debug(email, budget);
            const budgetsCollection = (await getDb()).collection(
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

    static async getBudget(email: string, month?: string): Promise<Budget[]> {
        try {
            const budgetsCollection = (await getDb()).collection(
                COLLECTIONS.BUDGETS
            );

            const budget = await budgetsCollection.find({
                email: email.toLowerCase(),
                month,
            });

            return [] as Budget[];
            // return budget as Budget[];
        } catch (error) {
            throw error;
        }
    }
}

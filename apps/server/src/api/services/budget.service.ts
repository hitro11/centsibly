import { logger } from '../../config/logger.js';
import { Budget, YearMonth } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { WithId } from 'mongodb';
import { getCurrentYearMonth } from '@centsibly/utils/utils';

export class BudgetService {
    static async addBudget(email: string, budget: Budget): Promise<void> {
        try {
            email = email.toLowerCase();
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

    static async getBudget(
        email: string,
        month: string
    ): Promise<WithId<Budget> | null> {
        try {
            const budgetsCollection = (await database()).collection<Budget>(
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

    static async getBudgets(
        email: string,
        from: YearMonth,
        to: YearMonth
    ): Promise<WithId<Budget>[]> {
        try {
            const budgetsCollection = (await database()).collection<Budget>(
                COLLECTIONS.BUDGETS
            );

            let budgets = await budgetsCollection
                .find({
                    email: email.toLowerCase(),
                    month: {
                        $gte: from,
                        $lte: to ?? from,
                    },
                })
                .toArray();

            return budgets ?? [];
        } catch (error) {
            throw error;
        }
    }

    static async getLatestBudget(email: string): Promise<WithId<Budget>[]> {
        try {
            const budgetsCollection = (await database()).collection<Budget>(
                COLLECTIONS.BUDGETS
            );

            let budget = await budgetsCollection.findOne({
                email: email.toLowerCase(),
                month: getCurrentYearMonth(),
            });

            return budget ? [budget] : [];
        } catch (error) {
            throw error;
        }
    }
}

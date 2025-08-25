import { logger } from '../../config/logger.js';
import { Budget, Transaction, YearMonth } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { WithId } from 'mongodb';
import {
    getCurrentYearMonth,
    getPreviousYearMonth,
} from '@centsibly/utils/utils';
import { UserService } from './user-service.js';

export class BudgetService {
    static async addBudget(email: string, yearMonth: YearMonth): Promise<void> {
        email = email.toLowerCase();
        const accountInfo = await UserService.getAccount(email);

        try {
            const budgetExists = !!(await this.getBudget(email, yearMonth));

            if (budgetExists) {
                throw new Error(
                    `budget already exists for ${email} in ${yearMonth}`
                );
            }
        } catch (error: any) {
            if (error.message?.includes('budget already exists')) {
                logger.error(error.message);
            } else {
                throw error;
            }
        }

        const budgetsCollection = (await database()).collection<Budget>(
            COLLECTIONS.BUDGETS
        );

        await budgetsCollection.insertOne({
            email,
            month: yearMonth,
            currency: accountInfo?.currency,
            income: accountInfo?.income,
            expenses: accountInfo?.expenses,
        });
    }

    static async getBudget(
        email: string,
        month: string
    ): Promise<WithId<Budget> | null> {
        const budgetsCollection = (await database()).collection<Budget>(
            COLLECTIONS.BUDGETS
        );

        const budget = await budgetsCollection.findOne({
            email: email.toLowerCase(),
            month,
        });

        return budget;
    }

    static async getBudgetsInTimeRange(
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

    static async getLatestBudget(
        email: string
    ): Promise<WithId<Budget> | null> {
        try {
            const budgetsCollection = (await database()).collection<Budget>(
                COLLECTIONS.BUDGETS
            );

            let budget = await budgetsCollection.findOne({
                email: email.toLowerCase(),
                month: getCurrentYearMonth(),
            });

            return budget ?? null;
        } catch (error) {
            throw error;
        }
    }

    static async updateBudgetActualsAfterTransaction(
        email: string,
        transactions: Transaction[]
    ) {
        try {
            const budget = await this.getLatestBudget(email);

            if (!budget) {
                throw new Error('Budget not found');
                return;
            }

            const budgetsCollection = (await database()).collection<Budget>(
                COLLECTIONS.BUDGETS
            );

            for (const transaction of transactions) {
                const i = budget.expenses.findIndex(
                    (expense) => transaction.category === expense.name
                );

                const update =
                    'actual' in budget.expenses[i]
                        ? {
                              $inc: {
                                  [`expenses.${i}.actual`]: transaction.amount,
                              },
                          }
                        : {
                              $set: {
                                  [`expenses.${i}.actual`]: transaction.amount,
                              },
                          };

                await budgetsCollection.updateOne(
                    {
                        email: email.toLowerCase(),
                        month: getCurrentYearMonth(),
                    },
                    update
                );
            }
        } catch (error) {}
    }

    static async createBudgetsForNewMonth(): Promise<void> {
        logger.info('createBudgetsForNewMonth()');

        const budgetsCollection = (await database()).collection<Budget>(
            COLLECTIONS.BUDGETS
        );

        const budgetsToBeCloned = await budgetsCollection
            .find({
                month: getPreviousYearMonth(),
            })
            .toArray();

        logger.debug('budgetsToBeCloned: ' + JSON.stringify(budgetsToBeCloned));

        const newBudgets = [];

        for (const budget of budgetsToBeCloned) {
            const { _id, ...newBudget } = budget;

            newBudgets.push({
                ...newBudget,
                expenses: budget.expenses.map((expense) => {
                    return { ...expense, actual: 0 };
                }),
                month: getCurrentYearMonth(),
            });
        }

        logger.debug('newBudgets: ' + JSON.stringify(newBudgets));
        budgetsCollection.insertMany(newBudgets, { ordered: true });
    }
}

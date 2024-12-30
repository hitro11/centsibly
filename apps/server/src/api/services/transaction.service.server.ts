import { logger } from '../../config/logger.js';
import { Transaction } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { getCurrentMonthandYear } from '@centsibly/utils/utils';

export class TransactionService {
    static async addTransaction(email: string, transaction: Transaction) {
        try {
            email = email.toLowerCase();
            const transactionsCollection = (await database()).collection(
                COLLECTIONS.TRANSACTIONS
            );

            const doc = {
                email,
                month: getCurrentMonthandYear(),
                amount: transaction.amount,
                category: transaction.category,
                type: transaction.type,
            };

            await transactionsCollection.insertOne(doc);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    // static async getBudget(email: string, month: string) {
    //     try {
    //         const budgetsCollection = (await database()).collection(
    //             COLLECTIONS.BUDGETS
    //         );

    //         const budget = await budgetsCollection.findOne({
    //             email: email.toLowerCase(),
    //             month,
    //         });

    //         return budget ?? null;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

import { logger } from '../../config/logger.js';
import { Transaction, YearMonth } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { getCurrentMonthandYear } from '@centsibly/utils/utils';
import { FindCursor, WithId, Document } from 'mongodb';

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

    /**
     * @param {string} email
     * @param {YearMonth} from from date
     * @param {YearMonth} [to] to date. If not specified, it is the current month
     * @return {Promise<FindCursor<WithId<Transaction>>>}
     */
    static async getTransactions(
        email: string,
        from: YearMonth,
        to?: YearMonth
    ): Promise<WithId<Transaction>[]> {
        try {
            const transactionCollection = (
                await database()
            ).collection<Transaction>(COLLECTIONS.TRANSACTIONS);

            const transactions = await transactionCollection
                .find({
                    email: email.toLowerCase(),
                    month: {
                        $gte: from,
                        $lte: to ?? from,
                    },
                })
                ?.toArray();

            return transactions ?? null;
        } catch (error) {
            throw error;
        }
    }
}

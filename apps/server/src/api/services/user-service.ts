import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import supertokens from 'supertokens-node';
import { SessionRequest } from 'supertokens-node/framework/express';
import { AccountInfo } from '@centsibly/utils/schemas';
import { getDb } from '../../config/db.js';

export class UserService {
    static async setUserInfo(email: string, budgetInfo: AccountInfo) {
        try {
            email = email.toLowerCase();
            logger.debug(email, budgetInfo);
            const accountsCollection = (await getDb()).collection('accounts');

            const isExistingAccount =
                !!(await accountsCollection.countDocuments(
                    { email },
                    { limit: 1 }
                ));

            if (isExistingAccount) {
                await accountsCollection.updateOne({ email }, [
                    { $set: { currency: budgetInfo.currency } },
                    { $set: { income: budgetInfo.income } },
                    { $set: { expenses: budgetInfo.expenses } },
                ]);
            } else {
                await accountsCollection.insertOne({
                    email,
                    currency: budgetInfo.currency,
                    income: budgetInfo.income,
                    expenses: budgetInfo.expenses,
                });
            }
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async getUserInfo(req: unknown) {
        try {
            const userid = (req as SessionRequest).session!.getUserId();
            return await supertokens.getUser(userid);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

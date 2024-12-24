import { logger } from '../../config/logger.js';
import supertokens from 'supertokens-node';
import { SessionRequest } from 'supertokens-node/framework/express';
import { Budget } from '@centsibly/utils/schemas';
import { getDb } from '../../config/db.js';

export class UserService {
    static async setAccount(email: string, budgetInfo: Budget) {
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

    static async getAccount(req: unknown) {
        try {
            const email = await this.getEmail(req);

            if (!email) {
                throw new Error('Unauthorized');
            }

            const accountsCollection = (await getDb()).collection('accounts');
            const account = await accountsCollection.findOne({
                email: email.toLowerCase(),
            });
            return account;
        } catch (error) {
            throw error;
        }
    }

    static async getAuthInfo(req: unknown) {
        try {
            const userid = (req as SessionRequest).session!.getUserId();
            return await supertokens.getUser(userid);
        } catch (error) {
            throw error;
        }
    }

    static async getEmail(req: unknown): Promise<string | null> {
        const userInfo = await this.getAuthInfo(req);
        return userInfo?.emails[0] ?? null;
    }

    static async doesAccountExist(req: unknown): Promise<boolean> {
        const doesAccountExist = !!(await this.getAccount(req));
        return doesAccountExist;
    }
}

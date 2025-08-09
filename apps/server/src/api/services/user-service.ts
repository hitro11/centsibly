import { logger } from '../../config/logger.js';
import supertokens from 'supertokens-node';
import { SessionRequest } from 'supertokens-node/framework/express';
import { Budget, AccountInfo } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';

export class UserService {
    static async updateAccount(email: string, accountInfo: AccountInfo) {
        try {
            email = email.toLowerCase();
            logger.debug(email, accountInfo);
            const accountsCollection = (await database()).collection(
                'accounts'
            );

            const isExistingAccount =
                !!(await accountsCollection.countDocuments(
                    { email },
                    { limit: 1 }
                ));

            if (isExistingAccount) {
                await accountsCollection.updateOne({ email }, [
                    { $set: { currency: accountInfo.currency } },
                    { $set: { income: accountInfo.income } },
                    { $set: { expenses: accountInfo.expenses } },
                ]);
            } else {
                await accountsCollection.insertOne({
                    email,
                    currency: accountInfo.currency,
                    income: accountInfo.income,
                    expenses: accountInfo.expenses,
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

            const accountsCollection = (await database()).collection(
                'accounts'
            );
            const account = await accountsCollection.findOne({
                email: email.toLowerCase(),
            });
            return account;
        } catch (error) {
            throw error;
        }
    }

    static async getSupertokensUserInfo(req: unknown) {
        try {
            const userid = (req as SessionRequest).session!.getUserId();
            return await supertokens.getUser(userid);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async getEmail(req: unknown): Promise<string | null> {
        try {
            const userInfo = await this.getSupertokensUserInfo(req);

            if (!userInfo) {
                throw new Error('user information not found');
            }

            return userInfo?.emails[0] ?? null;
        } catch (error) {
            throw error;
        }
    }

    static async doesAccountExist(req: unknown): Promise<boolean> {
        const doesAccountExist = !!(await this.getAccount(req));
        return doesAccountExist;
    }
}

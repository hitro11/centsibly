import { logger } from '../../config/logger.js';
import supertokens from 'supertokens-node';
import { SessionRequest } from 'supertokens-node/framework/express';
import { Budget, AccountInfo } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { WithId } from 'mongodb';

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

    static async getAccountOrNull(
        email: string
    ): Promise<WithId<AccountInfo> | null> {
        try {
            if (!email) {
                throw new Error('email must be provided');
            }
            const accountsCollection = (await database()).collection(
                'accounts'
            );
            const account = await accountsCollection.findOne<
                WithId<AccountInfo>
            >({
                email: email.toLowerCase(),
            });
            return account;
        } catch (error) {
            logger.error('Error fetching account:', error);
            throw error;
        }
    }

    static async getAccount(email: string): Promise<WithId<AccountInfo>> {
        const account = await this.getAccountOrNull(email);
        if (!account) {
            throw new Error(`Account not found: ${email}`);
        }
        return account;
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

    static async getEmail(req: unknown): Promise<string> {
        try {
            const userInfo = await this.getSupertokensUserInfo(req);

            if (!userInfo) {
                throw new Error('user information not found');
            }

            return userInfo?.emails[0];
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async doesAccountExist(req: unknown): Promise<boolean> {
        const email = await this.getEmail(req);
        const doesAccountExist = !!(await this.getAccount(email ?? ''));
        return doesAccountExist;
    }
}

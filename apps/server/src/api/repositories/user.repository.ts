import { COLLECTIONS } from '../../config/constants.js';
import { getDb } from '../../config/db.js';
import { logger } from '../../config/logger.js';

export class UserRepositoryService {
    constructor() {}

    static async setUsername(email: string, username: string) {
        try {
            const db = await getDb();
            await db.collection(COLLECTIONS.ACCOUNTS).insertOne({
                email,
                username,
            });
            logger.debug(`Added user ${email} with username ${username}`);
        } catch (error) {
            throw error;
        }
    }

    static async getUsername(email: string) {
        try {
            const db = await getDb();
            const doc = await db.collection(COLLECTIONS.ACCOUNTS).findOne({
                email,
            });

            return doc?.username;
        } catch (e) {
            throw e;
        }
    }
}

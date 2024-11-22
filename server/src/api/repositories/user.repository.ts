import { ACCOUNTS_COLLECTION } from '../../config/constants.js';
import { getDb } from '../../config/db.js';
import { logger } from '../../config/logger.js';

export class UserRepositoryService {
  constructor() {}

  static async addUser(email: string, username: string) {
    try {
      const db = await getDb();
      await db.collection(ACCOUNTS_COLLECTION).insertOne({
        email,
        username,
      });
      logger.debug(`Added user ${email} with username ${username}`);
    } catch (error) {
      logger.error(error);
    }
  }
}

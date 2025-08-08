import { logger } from '../../config/logger.js';
import { Budget, Transaction, YearMonth } from '@centsibly/utils/schemas';
import { database } from '../../config/db.js';
import { COLLECTIONS } from '../../config/constants.js';
import { Collection, WithId } from 'mongodb';

export class SettingsService {
    static async getSettings(): Promise<{}> {
        try {
            return {};
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

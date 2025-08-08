import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { Budget, YearMonth } from '@centsibly/utils/schemas';
import { WithId } from 'mongodb';
import { SettingsService } from '../services/settings.service.js';

export class SettingsController {
    static async getSettings(req: Request): Promise<{}> {
        try {
            return await SettingsService.getSettings();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

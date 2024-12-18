import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { UserService } from '../services/user-service.js';
import { AccountInfo } from '@centsibly/utils/schemas';

export class UserController {
    static async setUserInfo(req: unknown, accountInfo: AccountInfo) {
        try {
            const userInfo = await UserService.getUserInfo(req);
            if (!userInfo) {
                throw new Error('user information not found');
            }
            const email = userInfo.emails[0];
            return await UserService.setUserInfo(email, accountInfo);
        } catch (error) {
            throw error;
        }
    }

    static async getUserInfo(req: Request, res: Response) {
        return await UserService.getUserInfo(req);
    }
}

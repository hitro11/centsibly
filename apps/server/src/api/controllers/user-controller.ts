import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import { UserService } from '../services/user-service.js';
import { Budget, AccountInfo } from '@centsibly/utils/schemas';

export class UserController {
    static async updateAccount(req: unknown, accountInfo: AccountInfo) {
        try {
            const userInfo = await UserService.getSupertokensUserInfo(req);
            if (!userInfo) {
                throw new Error('User information not found');
            }
            const email = userInfo.emails[0];
            return await UserService.updateAccount(email, accountInfo);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    static async getAccount(req: Request, res: Response) {
        return await UserService.getAccount(req);
    }

    static async getAuthInfo(req: Request, res: Response) {
        return await UserService.getSupertokensUserInfo(req);
    }

    static async getEmail(req: Request, res: Response) {
        return await UserService.getEmail(req);
    }

    static async doesAccountExist(req: Request, res: Response) {
        return await UserService.doesAccountExist(req);
    }
}

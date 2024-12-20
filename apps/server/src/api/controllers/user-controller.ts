import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { UserService } from '../services/user-service.js';
import { AccountInfo } from '@centsibly/utils/schemas';

export class UserController {
    static async setAccount(req: unknown, accountInfo: AccountInfo) {
        try {
            const userInfo = await UserService.getAuthInfo(req);
            if (!userInfo) {
                throw new Error('user information not found');
            }
            const email = userInfo.emails[0];
            return await UserService.setAccount(email, accountInfo);
        } catch (error) {
            throw error;
        }
    }

    static async getAccount(req: Request, res: Response) {
        return await UserService.getAccount(req);
    }

    static async getAuthInfo(req: Request, res: Response) {
        return await UserService.getAuthInfo(req);
    }

    static async getEmail(req: Request, res: Response) {
        return await UserService.getEmail(req);
    }

    static async doesAccountExist(req: Request, res: Response) {
        return await UserService.doesAccountExist(req);
    }
}

import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { UserService } from '../services/user-service.js';

export class UserController {
    static async getUserRoles(req: Request, res: Response) {
        const roles = await UserService.getUserRoles(req, res);
        return roles;
    }

    static async setUserRoles(req: Request, res: Response) {
        await UserService.setUserRoles(req, res);
    }

    static async getUserInfo(req: Request, res: Response) {
        return await UserService.getUserInfo(req, res);
    }

    static async setUsername(req: Request, res: Response) {
        try {
            return await UserService.setUsername(req, res);
        } catch (error) {
            throw error;
        }
    }
}

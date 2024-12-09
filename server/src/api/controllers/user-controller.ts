import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { UserService } from '../services/user-service.js';

export class UserController {

    static async setUserInfo(req: Request, res: Response) {
        return await UserService.setUserInfo(req, res);
    }

}

import { Request, Response } from 'express';
import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { AuthService } from '../services/auth-service.js';

export class AuthController {
    static async getCurrentSession(req: Request, res: Response) {
        const userid = await AuthService.getCurrentSession(req, res);
        return userid;
    }
}

import { logger } from '../../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import supertokens from 'supertokens-node';
import { UserRepositoryService } from '../repositories/user.repository.js';

export class UserService {
    static async setUserInfo(req: Request, res: Response) {
        try {
            const userid = '';
            const userInfo = await supertokens.getUser(userid);
            return userInfo;
        } catch (error) {
            logger.error(error);
        }
    }
}

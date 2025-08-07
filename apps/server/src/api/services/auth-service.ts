import { logger } from '../../config/logger.js';
import { Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';

export class AuthService {
    static async getCurrentSession(req: Request, res: Response) {
        logger.debug('in getCurrentSession()..');
        const session = await Session.getSession(req, res);
        const userid = session.getUserId();
        logger.debug(userid);
        return userid;
    }
}

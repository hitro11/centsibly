import { Router, Response, Request, NextFunction } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { logger } from '../../config/logger.js';

const router = Router();

router.post(
    '/account-info',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountInfo = req.body;
            await UserController.setUserInfo(req, accountInfo);
            res.json();
        } catch (error) {
            next(error);
        }
    }
);

router.get('/account-info', async (req, res, next: NextFunction) => {
    try {
        const userInfo = await UserController.getUserInfo(req, res);
        res.json(userInfo);
    } catch (error) {
        next(error);
    }
});

export const userRoutes = router;

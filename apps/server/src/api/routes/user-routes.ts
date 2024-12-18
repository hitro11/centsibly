import { Router, Response, Request, NextFunction } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { validateData } from '../middleware/validation.middleware.js';
import { AccountInfoSchema } from '@centsibly/utils/schemas';

const router = Router();

router.post(
    '/account-info',
    validateData(AccountInfoSchema),
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

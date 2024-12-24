import { Router, Response, Request, NextFunction } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { validateData } from '../middleware/validation.middleware.js';
import { BudgetSchema } from '@centsibly/utils/schemas';

const router = Router();

router.get(
    '/account',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInfo = await UserController.getAccount(req, res);
            res.json(userInfo);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/account',
    validateData(BudgetSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountInfo = req.body;
            await UserController.setAccount(req, accountInfo);
            res.json();
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/auth-info',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInfo = await UserController.getAuthInfo(req, res);
            res.json(userInfo);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/email',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = await UserController.getEmail(req, res);
            res.json({ email });
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/exists',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doesAccountExist = await UserController.doesAccountExist(
                req,
                res
            );
            res.json({ doesAccountExist });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/email', async (req, res, next: NextFunction) => {
    try {
        const email = await UserController.getEmail(req, res);
        res.json({ email });
    } catch (error) {
        next(error);
    }
});

router.get('/exists', async (req, res, next: NextFunction) => {
    try {
        const doesAccountExist = await UserController.doesAccountExist(
            req,
            res
        );
        res.json({ doesAccountExist });
    } catch (error) {
        next(error);
    }
});

export const userRoutes: Router = router;

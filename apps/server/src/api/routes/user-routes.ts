import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { logger } from '../../config/logger.js';

const router = Router();

router.post('/account-info', async (req: Request, res: Response) => {
    try {
        const accountInfo = req.body;
        await UserController.setUserInfo(req, accountInfo);
        res.json();
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/account-info', async (req, res) => {
    try {
        const userInfo = await UserController.getUserInfo(req, res);
        res.json(userInfo);
    } catch (error) {
        res.status(500).json(error);
    }
});

export const userRoutes = router;

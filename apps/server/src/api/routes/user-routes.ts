import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';

const router = Router();

router.post('/account-info', async (req, res) => {
    try {
        const accountInfo = req.body.accountInfo;
        await UserController.setUserInfo(req, res);
        res.json();
    } catch (error) {
        res.status(500).json(error);
    }
});

export const userRoutes = router;

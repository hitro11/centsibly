import { Router, Response, Request, NextFunction } from 'express';
import { validateData } from '../middleware/validation.middleware.js';
import { SettingsController } from '../controllers/settings.controller.js';
import { createHttpResponse } from '@centsibly/utils/utils';
import { WithId } from 'mongodb';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const settings: {} = await SettingsController.getSettings(req);
        res.json(createHttpResponse('success', settings, null));
    } catch (error) {
        next(error);
    }
});

export const settingsRoutes: Router = router;

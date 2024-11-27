import { Router } from 'express';
import { redditUserRoutes } from '../user-routes.js';

const router = Router();
router.use('/user', redditUserRoutes);

export const redditRoutes = router;

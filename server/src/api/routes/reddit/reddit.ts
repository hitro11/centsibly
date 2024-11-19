import { Router } from 'express';
import { redditUserRoutes } from './user/user.js';

const router = Router();
router.use('/user', redditUserRoutes);

export const redditRoutes = router;

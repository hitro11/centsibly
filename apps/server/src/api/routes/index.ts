import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { authRoutes } from './auth-routes.js';
import { userRoutes } from './user-routes.js';
import { Router } from 'express';

const indexRouter = Router();
indexRouter.use('/auth', authRoutes);
indexRouter.use('/user', verifySession(), userRoutes);
export const router = indexRouter;

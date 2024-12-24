import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { authRoutes } from './auth-routes.js';
import { userRoutes } from './user-routes.js';
import { budgetRoutes } from './budget.routes.js';
import { Router } from 'express';

const indexRouter = Router();
indexRouter.use('/auth', authRoutes);
indexRouter.use('/user', verifySession() as any, userRoutes);
indexRouter.use('/budget', verifySession() as any, budgetRoutes);
export const router: Router = indexRouter;

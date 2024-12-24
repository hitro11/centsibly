import { middleware } from 'supertokens-node/framework/express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { authRoutes } from './auth-routes.js';
import { userRoutes } from './user-routes.js';
import { budgetRoutes } from './budget.routes.js';
import { RequestHandler, Router } from 'express';

const indexRouter = Router();
indexRouter.use('/auth', authRoutes);
indexRouter.use('/user', verifySession() as RequestHandler, userRoutes);
indexRouter.use('/budgets', verifySession() as RequestHandler, budgetRoutes);
export const router: Router = indexRouter;

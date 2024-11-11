import { login as loginController } from '../controllers/login.controller';
import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.get('/', async (req: Request, res: Response) => {
    await loginController();
    res.json('redirected to login');
});

export default loginRoutes;


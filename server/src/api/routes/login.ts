import { getOauthRedirectUri as loginController } from '../controllers/login.controller';
import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.get('/', async (req: Request, res: Response) => {
    const url = await loginController();
    res.json(url);
});

export default loginRoutes;

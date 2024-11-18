import { Router } from 'express';
import { logger } from '../../../config/logger.js';

const router = Router();

router.get('/test', async (req: Request, res: any) => {
  console.log('test route');
  res.json('test route');
});

router.get('/user/:username/subreddits', async (req: any, res: any) => {
  logger.debug('username: ', req.params.username);
  logger.debug('subreddits()');
  res.json('subreddits()');
});

export default router;

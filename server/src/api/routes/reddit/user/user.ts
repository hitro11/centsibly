import { Router, Request, Response } from 'express';
import { logger } from '../../../../config/logger.js';
import { redditUserController } from '../../../controllers/reddit-user.js';

const router = Router();

router.get('/:username/subreddits', async (req: Request, res: Response) => {
  const accessToken =
    req.headers['x-reddit-oauth']?.toString().split('Bearer ')[1] ?? '';
  const subreddits = await redditUserController.getUserSubscribedSubreddits(
    accessToken
  );
  res.json(subreddits);
});

export const redditUserRoutes = router;

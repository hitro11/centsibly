import { Router } from 'express';

const router = Router();

router.get('/test', async (req: Request, res: any) => {
  console.log('test route');
  res.json('test route');
});

export default router;

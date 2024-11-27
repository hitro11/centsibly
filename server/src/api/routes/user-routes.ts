import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { logger } from '../../config/logger.js';

const router = Router();
router.get('/roles', async (req, res) => {
  const roles = await UserController.getUserRoles(req, res);
  res.json(roles);
});

router.post('/roles', async (req, res) => {
  await UserController.setUserRoles(req, res);
  res.json();
});

router.get('/info', async (req, res) => {
  res.json(await UserController.getUserInfo(req, res));
});

export const userRoutes = router;

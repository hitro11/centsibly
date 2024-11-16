import { verifyJWT } from '../services/authentication.js';
import authRoutes from './auth.js';
import redditRoutes from './reddit/reddit.js';
import { Router } from 'express';

const router = Router();
router.use('/auth', authRoutes);
router.use('/reddit', verifyJWT, redditRoutes);
export default router;

import authRoutes from "./auth";
import { Router } from 'express';

const router = Router();
router.use('/auth', authRoutes);
export default router;
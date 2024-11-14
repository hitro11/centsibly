import loginRoutes from "./auth";
import { Router } from 'express';

const router = Router();
router.use('/auth', loginRoutes);
export default router;
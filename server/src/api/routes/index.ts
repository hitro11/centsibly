import loginRoutes from "./login";
import { Router } from 'express';

const router = Router();
router.use('/login', loginRoutes);
export default router;
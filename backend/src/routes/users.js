import express from 'express';
import auth from '../middleware/auth.js';
import { getMe, updateMe, getPlan, savePlan, getLogs, addLog } from '../controllers/userController.js';

const router = express.Router();

router.use(auth);

router.get('/me', getMe);
router.patch('/me', updateMe);

router.get('/me/plan', getPlan);
router.put('/me/plan', savePlan);

router.get('/me/logs', getLogs);
router.post('/me/logs', addLog);

export default router;

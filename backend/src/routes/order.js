import express from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

export default router;

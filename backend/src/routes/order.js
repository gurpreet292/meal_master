import express from 'express';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deliveryAddress:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     meal:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created
 */

router.post('/', createOrder);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched
 */
router.get('/', getMyOrders);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);

export default router;

import express from 'express';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../controllers/cartController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get current user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched
 */

router.get('/', getCart);

/**
 * @openapi
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mealId]
 *             properties:
 *               mealId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added
 */
router.post('/add', addToCart);

/**
 * @openapi
 * /api/cart/update:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mealId, quantity]
 *             properties:
 *               mealId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.put('/update', updateCartItem);
router.delete('/remove/:mealId', removeFromCart);

export default router;

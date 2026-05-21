import express from 'express';
import { body } from 'express-validator';
import { getMeals, getMeal, createMeal, updateMeal, deleteMeal } from '../controllers/mealController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/meals:
 *   get:
 *     summary: List meals
 *     tags: [Meals]
 *     responses:
 *       200:
 *         description: Meals fetched
 */

router.get('/', getMeals);

/**
 * @openapi
 * /api/meals/{id}:
 *   get:
 *     summary: Get a single meal
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal fetched
 */
router.get('/:id', getMeal);

// Only admins can manage meals
router.post(
	'/',
	auth,
	admin,
	upload.single('image'),
	[
		body('title').notEmpty(),
		body('description').notEmpty(),
		body('category').notEmpty(),
		body('price').isNumeric()
	],
	createMeal
);
router.put('/:id', auth, admin, upload.single('image'), updateMeal);
router.delete('/:id', auth, admin, deleteMeal);

export default router;

import express from 'express';
import { body } from 'express-validator';
import { getMeals, getMeal, createMeal, updateMeal, deleteMeal } from '../controllers/mealController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMeal);

// Only admins can manage meals
router.post('/', auth, admin, upload.single('image'), [body('title').notEmpty(), body('price').isNumeric()], createMeal);
router.put('/:id', auth, admin, upload.single('image'), updateMeal);
router.delete('/:id', auth, admin, deleteMeal);

export default router;

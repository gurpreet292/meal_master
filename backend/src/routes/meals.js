import express from 'express';
import { body } from 'express-validator';
import { getMeals, getMeal, createMeal, updateMeal, deleteMeal } from '../controllers/mealController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMeal);
router.post('/', auth, [body('title').notEmpty(), body('price').isNumeric()], createMeal);
router.put('/:id', auth, updateMeal);
router.delete('/:id', auth, deleteMeal);

export default router;

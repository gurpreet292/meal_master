import { validationResult } from 'express-validator';
import Meal from '../models/Meal.js';

export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.json(meals);
  } catch (err) {
    next(err);
  }
};

export const getMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    next(err);
  }
};

export const createMeal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const meal = new Meal({ ...req.body, createdBy: req.user.id });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    next(err);
  }
};

export const updateMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json(meal);
  } catch (err) {
    next(err);
  }
};

export const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    next(err);
  }
};

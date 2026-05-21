import { validationResult } from 'express-validator';
import Meal from '../models/Meal.js';
import { uploadImage } from '../utils/cloudinary.js';

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
    let imageUrl = '';
    if (req.file) {
      const result = await uploadImage(req.file.path);
      imageUrl = result.secure_url;
    }
    const meal = new Meal({ ...req.body, image: imageUrl || req.body.image, createdBy: req.user.id });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    next(err);
  }
};

export const updateMeal = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      const result = await uploadImage(req.file.path);
      updateData.image = result.secure_url;
    }
    const meal = await Meal.findByIdAndUpdate(req.params.id, updateData, { new: true });
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

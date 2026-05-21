import { validationResult } from 'express-validator';
import Meal from '../models/Meal.js';
import { uploadImage } from '../utils/cloudinary.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    return successResponse(res, 'Meals fetched', meals);
  } catch (err) {
    next(err);
  }
};

export const getMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return errorResponse(res, 'Meal not found', 404);
    return successResponse(res, 'Meal fetched', meal);
  } catch (err) {
    next(err);
  }
};

export const createMeal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
  try {
    let imageUrl = '';
    if (req.file) {
      const result = await uploadImage(req.file.path);
      imageUrl = result.secure_url;
    }
    const meal = new Meal({ ...req.body, image: imageUrl || req.body.image, createdBy: req.user.id });
    await meal.save();
    return successResponse(res, 'Meal created', meal, 201);
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
    if (!meal) return errorResponse(res, 'Meal not found', 404);
    return successResponse(res, 'Meal updated', meal);
  } catch (err) {
    next(err);
  }
};

export const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return errorResponse(res, 'Meal not found', 404);
    return successResponse(res, 'Meal deleted');
  } catch (err) {
    next(err);
  }
};

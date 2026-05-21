import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

const signToken = (user) => jwt.sign(
  { id: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return errorResponse(res, 'User already exists', 400);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashed });
    await user.save();
    const token = signToken(user);
    return successResponse(
      res,
      'User registered successfully',
      { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      201
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'Invalid credentials', 400);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return errorResponse(res, 'Invalid credentials', 400);
    const token = signToken(user);
    return successResponse(res, 'Login successful', {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'Profile fetched', user);
  } catch (err) {
    next(err);
  }
};

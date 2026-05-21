import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'User fetched', user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.phone !== undefined) updates.phone = req.body.phone;
    if (req.body.address !== undefined) updates.address = req.body.address;
    if (req.body.preferences !== undefined) updates.preferences = req.body.preferences;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'User updated', user);
  } catch (err) {
    next(err);
  }
};

export const getPlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('plan');
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'Plan fetched', { plan: user.plan || null });
  } catch (err) {
    next(err);
  }
};

export const savePlan = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { plan: req.body.plan },
      { new: true, select: 'plan' }
    );
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'Plan saved', { plan: user.plan || null });
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('logs');
    if (!user) return errorResponse(res, 'User not found', 404);
    return successResponse(res, 'Logs fetched', { logs: user.logs || [] });
  } catch (err) {
    next(err);
  }
};

export const addLog = async (req, res, next) => {
  try {
    const entry = {
      id: req.body.id || `log_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...req.body
    };
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 'User not found', 404);
    user.logs = Array.isArray(user.logs) ? user.logs : [];
    user.logs.push(entry);
    await user.save();
    return successResponse(res, 'Log added', { logs: user.logs }, 201);
  } catch (err) {
    next(err);
  }
};

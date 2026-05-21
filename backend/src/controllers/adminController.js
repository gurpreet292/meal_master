import User from '../models/User.js';
import Order from '../models/Order.js';
import Meal from '../models/Meal.js';
import { successResponse } from '../utils/responseHandler.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const mealCount = await Meal.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    return successResponse(res, 'Dashboard stats fetched', {
      users: userCount,
      orders: orderCount,
      meals: mealCount,
      revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
    });
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    return successResponse(res, 'Orders fetched', orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus })
      },
      { new: true }
    );
    return successResponse(res, 'Order updated', order);
  } catch (err) {
    next(err);
  }
};

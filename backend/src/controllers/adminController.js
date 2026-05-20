import User from '../models/User.js';
import Order from '../models/Order.js';
import Meal from '../models/Meal.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const mealCount = await Meal.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    res.json({
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
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, {
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus })
    }, { new: true });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

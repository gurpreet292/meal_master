import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createOrder = async (req, res, next) => {
  try {
    const { deliveryAddress, items: requestItems, totalAmount } = req.body;
    if (!deliveryAddress) return errorResponse(res, 'Delivery address is required', 400);

    let items = requestItems;
    if (!items || items.length === 0) {
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.meal');
      items = cart?.items?.map(item => ({
        meal: item.meal._id,
        quantity: item.quantity,
        price: item.meal.price
      })) || [];
    }

    if (!items || items.length === 0) {
      return errorResponse(res, 'Order items are required', 400);
    }

    const computedTotal = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount: totalAmount ?? computedTotal,
      deliveryAddress
    });
    await order.save();

    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
    return successResponse(res, 'Order created', order, 201);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.meal')
      .sort({ createdAt: -1 });
    return successResponse(res, 'Orders fetched', orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.meal');
    if (!order) return errorResponse(res, 'Order not found', 404);
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Not authorized', 403);
    }
    return successResponse(res, 'Order fetched', order);
  } catch (err) {
    next(err);
  }
};

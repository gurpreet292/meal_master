import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, items, totalAmount } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress
    });
    await order.save();
    // Clear cart after order creation
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.meal').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.meal');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

import crypto from 'crypto';
import getRazorpay from '../config/razorpay.js';
import Order from '../models/Order.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return errorResponse(res, 'Order not found', 404);
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Not authorized', 403);
    }

    const amount = Math.round(order.totalAmount * 100);
  const razorpay = getRazorpay();
  const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `order_${order._id}`,
      notes: {
        orderId: order._id.toString(),
        userId: req.user.id
      }
    });

    order.paymentOrderId = razorpayOrder.id;
    await order.save();

    return successResponse(res, 'Razorpay order created', {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    });
  } catch (err) {
    next(err);
  }
};

export const verifyRazorpayPayment = async (req, res, next) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return errorResponse(res, 'Order not found', 404);
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Not authorized', 403);
    }

    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return errorResponse(res, 'Payment signature verification failed', 400);
    }

    order.paymentStatus = 'paid';
    order.paymentProvider = 'razorpay';
    order.paymentOrderId = razorpayOrderId;
    order.paymentId = razorpayPaymentId;
    order.paymentSignature = razorpaySignature;
    order.orderStatus = 'confirmed';
    await order.save();

    return successResponse(res, 'Payment verified', order);
  } catch (err) {
    next(err);
  }
};

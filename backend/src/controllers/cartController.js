import Cart from '../models/Cart.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.meal');
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    return successResponse(res, 'Cart fetched', cart);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { mealId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.meal.toString() === mealId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ meal: mealId, quantity });
    }
    await cart.save();
    const updatedCart = await cart.populate('items.meal');
    return successResponse(res, 'Item added to cart', updatedCart);
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { mealId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(item => item.meal.toString() !== mealId);
      await cart.save();
    }
    return successResponse(res, 'Item removed from cart', cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { mealId, quantity } = req.body;
    if (quantity === undefined) {
      return errorResponse(res, 'Quantity is required', 400);
    }
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.meal.toString() === mealId);
    if (itemIndex === -1) {
      return errorResponse(res, 'Meal not found in cart', 404);
    }
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.meal.toString() !== mealId);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();
    const updatedCart = await cart.populate('items.meal');
    return successResponse(res, 'Cart updated', updatedCart);
  } catch (err) {
    next(err);
  }
};

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentProvider: { type: String, enum: ['razorpay'], default: 'razorpay' },
  paymentId: { type: String },
  paymentOrderId: { type: String },
  paymentSignature: { type: String },
  orderStatus: { type: String, enum: ['processing', 'confirmed', 'delivered', 'cancelled'], default: 'processing' },
  deliveryAddress: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);

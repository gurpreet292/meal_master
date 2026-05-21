import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
  plan: { type: mongoose.Schema.Types.Mixed, default: null },
  logs: { type: [mongoose.Schema.Types.Mixed], default: [] }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

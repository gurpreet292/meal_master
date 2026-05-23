import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = globalThis.process?.env?.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI not set in env');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    return false;
  }
};

export default connectDB;

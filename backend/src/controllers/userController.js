import User from '../models/User.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.preferences !== undefined) updates.preferences = req.body.preferences;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getPlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('plan');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ plan: user.plan || null });
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
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ plan: user.plan || null });
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('logs');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ logs: user.logs || [] });
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
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.logs = Array.isArray(user.logs) ? user.logs : [];
    user.logs.push(entry);
    await user.save();
    res.status(201).json({ logs: user.logs });
  } catch (err) {
    next(err);
  }
};

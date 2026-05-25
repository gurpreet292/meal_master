import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Meal from './models/Meal.js';

dotenv.config();

const seedMeals = [
  {
    title: 'Avocado Toast Bowl',
    description: 'Creamy avocado on toasted grains with a citrus drizzle.',
    price: 9.99,
    category: 'Breakfast',
    image: '/avocado_toast.png',
    rating: 4.7,
    isAvailable: true
  },
  {
    title: 'Salmon Wrap',
    description: 'Omega-3 rich salmon with crisp greens and lemon tahini.',
    price: 13.5,
    category: 'Lunch',
    image: '/salmon_wrap_topdown_1779170173897.png',
    rating: 4.8,
    isAvailable: true
  },
  {
    title: 'Berry Quinoa Bowl',
    description: 'Quinoa, berries, and chia seeds for a protein boost.',
    price: 10.5,
    category: 'Snack',
    image: '/berry_quinoa_topdown_1779170262202.png',
    rating: 4.6,
    isAvailable: true
  }
];

const seed = async () => {
  try {
    await connectDB();

    const shouldDestroy = process.argv.includes('--destroy');
    if (shouldDestroy) {
      await Meal.deleteMany();
      await User.deleteMany();
      console.log('Seed data destroyed');
      process.exit(0);
    }

    await Meal.deleteMany();
    await User.deleteMany();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminPassword || !adminEmail) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = await User.create({
      name: 'Meal Master Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    const mealsWithOwner = seedMeals.map((meal) => ({
      ...meal,
      createdBy: admin._id
    }));

    await Meal.insertMany(mealsWithOwner);
    console.log('Seed data created');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();

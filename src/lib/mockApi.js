// Lightweight frontend-only mock API using localStorage
const KEY_USERS = 'mm_users_v2';
const KEY_CURRENT = 'mm_current_user_v2';
const KEY_RECIPES = 'mm_recipes_v2';
const KEY_PLANS = 'mm_plans_v2';
const KEY_LOGS = 'mm_logs_v2';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function write(key, v) {
  localStorage.setItem(key, JSON.stringify(v));
}

function ensureInitialData() {
  if (!read(KEY_RECIPES, null)) {
    const sample = [
      { 
        id: 'r1', 
        name: 'Smoked Salmon Wrap', 
        description: 'A light and refreshing wrap packed with omega-3 rich salmon, crisp lettuce, and a zesty dill dressing. Perfect for a quick, brain-boosting lunch.',
        calories: 420, protein: 28, carbs: 30, fat: 18, time: '15m', rating: 4.8, tags: ['seafood', 'lunch', 'high-protein'],
        image: '/salmon_wrap_topdown_1779170173897.png',
        ingredients: ['1 Whole Wheat Tortilla', '4 oz Smoked Salmon', '1 cup Fresh Spinach', '2 tbsp Cream Cheese', '1 tsp Fresh Dill', 'Cucumber slices'],
        instructions: '1. Lay the tortilla flat and spread the cream cheese evenly.\n2. Layer the spinach, smoked salmon, and cucumber slices.\n3. Sprinkle with fresh dill.\n4. Roll tightly, slice in half, and serve immediately.'
      },
      { 
        id: 'r2', 
        name: 'Avocado Toast & Poached Egg', 
        description: 'Rustic sourdough topped with creamy mashed avocado, chili flakes, and a perfectly runny poached egg. A cortisol-friendly morning classic.',
        calories: 380, protein: 18, carbs: 35, fat: 22, time: '10m', rating: 4.9, tags: ['breakfast', 'vegetarian', 'quick'],
        image: '/avocado_toast.png',
        ingredients: ['1 slice Sourdough Bread', '1/2 Ripe Avocado', '1 Large Pasture-Raised Egg', 'Pinch of Chili Flakes', 'Sea Salt & Black Pepper', 'Squeeze of Lemon'],
        instructions: '1. Toast the sourdough bread until golden and crisp.\n2. Mash the avocado with a squeeze of lemon juice and spread it over the toast.\n3. Poach the egg in gently simmering water for 3 minutes.\n4. Place the egg on top, season with salt, pepper, and chili flakes.'
      },
      { 
        id: 'r3', 
        name: 'Berry Quinoa Bowl', 
        description: 'A protein-packed alternative to oatmeal. Warm quinoa mixed with almond milk, topped with fresh mixed berries and a drizzle of honey.',
        calories: 310, protein: 12, carbs: 48, fat: 8, time: '15m', rating: 4.7, tags: ['vegan', 'breakfast', 'gluten-free'],
        image: '/berry_quinoa_topdown_1779170262202.png',
        ingredients: ['1/2 cup Cooked Quinoa', '1/2 cup Almond Milk', '1/4 cup Blueberries', '1/4 cup Strawberries', '1 tbsp Honey or Maple Syrup', '1 tbsp Chia Seeds'],
        instructions: '1. Warm the cooked quinoa and almond milk in a small saucepan.\n2. Stir in the chia seeds and let it thicken slightly.\n3. Transfer to a bowl and top with fresh berries.\n4. Drizzle with honey before serving.'
      },
      { 
        id: 'r4', 
        name: 'Vibrant Mediterranean Salad', 
        description: 'A colorful, antioxidant-rich salad featuring grilled chicken, kalamata olives, feta cheese, and a light lemon-herb vinaigrette.',
        calories: 450, protein: 35, carbs: 15, fat: 28, time: '20m', rating: 4.9, tags: ['lunch', 'low-carb', 'high-protein'],
        image: '/med_salad.png',
        ingredients: ['5 oz Grilled Chicken Breast', '2 cups Mixed Greens', '1/4 cup Feta Cheese', '1/4 cup Kalamata Olives', 'Cherry Tomatoes', '2 tbsp Lemon Vinaigrette'],
        instructions: '1. Chop the grilled chicken into bite-sized pieces.\n2. In a large bowl, toss the greens, tomatoes, and olives.\n3. Add the chicken and crumble the feta on top.\n4. Dress with the vinaigrette and toss gently to combine.'
      },
      { 
        id: 'r5', 
        name: 'Cozy Morning Oatmeal', 
        description: 'Hearty steel-cut oats slow-cooked to creamy perfection, garnished with fresh berries, toasted almonds, and a touch of cinnamon.',
        calories: 290, protein: 8, carbs: 45, fat: 6, time: '20m', rating: 4.6, tags: ['breakfast', 'vegan', 'high-fiber'],
        image: '/oatmeal_bowl.png',
        ingredients: ['1/2 cup Rolled Oats', '1 cup Water or Milk', 'Handful of Mixed Berries', '1 tbsp Toasted Almonds', 'Pinch of Cinnamon', '1 tsp Honey'],
        instructions: '1. Bring the liquid to a boil, then stir in the oats.\n2. Reduce heat and simmer until the liquid is absorbed (about 5-10 minutes).\n3. Pour into a bowl and top with berries and almonds.\n4. Sprinkle with cinnamon and a dash of honey.'
      },
      { 
        id: 'r6', 
        name: 'Grilled Steak & Sweet Potato', 
        description: 'A premium dinner featuring a perfectly seared sirloin steak, creamy sweet potato mash, and roasted asparagus.',
        calories: 620, protein: 45, carbs: 38, fat: 30, time: '30m', rating: 5.0, tags: ['dinner', 'high-protein', 'meat'],
        image: '/grilled_steak.png',
        ingredients: ['6 oz Sirloin Steak', '1 Medium Sweet Potato', '1/2 bunch Asparagus', '1 tbsp Olive Oil', '1 tbsp Butter', 'Rosemary & Garlic'],
        instructions: '1. Boil the sweet potato until tender, then mash with a little butter and salt.\n2. Season the steak generously. Heat a cast-iron skillet over high heat.\n3. Sear the steak for 3-4 minutes per side for medium-rare. Let it rest.\n4. Toss the asparagus in olive oil and quickly roast or pan-fry until tender-crisp.\n5. Plate the mash, top with sliced steak, and serve asparagus on the side.'
      }
    ];
    write(KEY_RECIPES, sample);
  }
  if (!read(KEY_USERS, null)) write(KEY_USERS, []);
  if (!read(KEY_PLANS, null)) write(KEY_PLANS, {});
  if (!read(KEY_LOGS, null)) write(KEY_LOGS, {});
}

ensureInitialData();

function seedDemoDataForUser(userId) {
  const recipes = read(KEY_RECIPES, []);
  if (recipes.length === 0) return;

  // Seed a beautiful Meal Plan for the week
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const demoPlan = {};
  days.forEach(day => {
    demoPlan[day] = {
      Breakfast: [{ id: Date.now() + Math.random(), name: recipes[2].name }], // Berry Quinoa Bowl
      Lunch: [{ id: Date.now() + Math.random(), name: recipes[0].name }], // Salmon Wrap
      Dinner: [{ id: Date.now() + Math.random(), name: recipes[5].name }], // Grilled Steak
      Snack: [{ id: Date.now() + Math.random(), name: 'Matcha Latte' }]
    };
  });
  const plans = read(KEY_PLANS, {});
  plans[userId] = demoPlan;
  write(KEY_PLANS, plans);

  // Seed 7 days of logs ending today
  const logs = read(KEY_LOGS, {});
  logs[userId] = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Add breakfast
    logs[userId].push({
      id: 'l_' + Date.now() + Math.random(),
      name: recipes[2].name,
      calories: recipes[2].calories,
      protein: recipes[2].protein,
      carbs: recipes[2].carbs,
      fat: recipes[2].fat,
      date: dateStr,
      time: '08:30 AM'
    });
    
    // Add lunch
    logs[userId].push({
      id: 'l_' + Date.now() + Math.random(),
      name: recipes[0].name,
      calories: recipes[0].calories,
      protein: recipes[0].protein,
      carbs: recipes[0].carbs,
      fat: recipes[0].fat,
      date: dateStr,
      time: '01:15 PM'
    });
    
    // Add dinner (slightly randomized so the chart isn't flat)
    const dinnerCal = recipes[5].calories + Math.floor(Math.random() * 100) - 50;
    logs[userId].push({
      id: 'l_' + Date.now() + Math.random(),
      name: recipes[5].name,
      calories: dinnerCal,
      protein: recipes[5].protein,
      carbs: recipes[5].carbs,
      fat: recipes[5].fat,
      date: dateStr,
      time: '07:45 PM'
    });
  }
  
  write(KEY_LOGS, logs);
}

// Check if the current user needs to be seeded right now so the app is instantly beautiful
const _initUser = read(KEY_CURRENT, null);
if (_initUser) {
  const _logs = read(KEY_LOGS, {});
  if (!_logs[_initUser.id] || _logs[_initUser.id].length === 0) {
    seedDemoDataForUser(_initUser.id);
  }
}

const mockApi = {
  register: ({ name, email, password, preferences = {} }) => {
    const users = read(KEY_USERS, []);
    if (users.find(u => u.email === email)) throw new Error('Email already registered');
    const user = { id: 'u_' + Date.now(), name, email, password, preferences };
    users.push(user);
    write(KEY_USERS, users);
    
    // AUTO-SEED DEMO DATA FOR NEW USERS SO THE APP LOOKS STUNNING
    seedDemoDataForUser(user.id);
    
    // Do not automatically persist current user to avoid silent/demo sign-in
    return user;
  },

  login: ({ email, password }) => {
    const users = read(KEY_USERS, []);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    // Auto-seed if they have no logs, so the app always looks good for the demo
    const logs = read(KEY_LOGS, {});
    if (!logs[user.id] || logs[user.id].length === 0) {
      seedDemoDataForUser(user.id);
    }
    // Do not automatically persist current user to avoid silent/demo sign-in
    return user;
  },

  logout: () => {
    localStorage.removeItem(KEY_CURRENT);
  },

  getCurrentUser: () => read(KEY_CURRENT, null),

  updateProfile: (id, patch) => {
    const users = read(KEY_USERS, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...patch };
    write(KEY_USERS, users);
    write(KEY_CURRENT, users[idx]);
    return users[idx];
  },

  getRecipes: (q = '') => {
    const recipes = read(KEY_RECIPES, []);
    if (!q) return recipes;
    return recipes.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) || (r.tags || []).some(t => t.includes(q.toLowerCase())));
  },

  addRecipe: (recipe) => {
    const recipes = read(KEY_RECIPES, []);
    const r = { id: 'r_' + Date.now(), ...recipe };
    recipes.unshift(r);
    write(KEY_RECIPES, recipes);
    return r;
  },

  savePlan: (userId, plan) => {
    const plans = read(KEY_PLANS, {});
    plans[userId] = plan;
    write(KEY_PLANS, plans);
    return plan;
  },

  getPlan: (userId) => {
    const plans = read(KEY_PLANS, {});
    return plans[userId] || null;
  },

  generateGroceryList: (plan) => {
    // plan is expected to be { day: { mealType: recipeId } }
    const recipes = read(KEY_RECIPES, []);
    const items = {};
    Object.values(plan || {}).forEach(day => {
      Object.values(day).forEach(rid => {
        const r = recipes.find(x => x.id === rid);
        if (!r || !r.ingredients) return;
        r.ingredients.forEach(i => {
          const key = i.name.toLowerCase();
          items[key] = items[key] ? items[key] + (i.qty || 1) : (i.qty || 1);
        });
      });
    });
    return Object.entries(items).map(([name, qty]) => ({ name, qty }));
  },

  logFood: (userId, log) => {
    const logs = read(KEY_LOGS, {});
    logs[userId] = logs[userId] || [];
    logs[userId].push({ id: 'l_' + Date.now(), ...log });
    write(KEY_LOGS, logs);
    return logs[userId];
  },

  getLogs: (userId) => {
    const logs = read(KEY_LOGS, {});
    return logs[userId] || [];
  }
};

export default mockApi;

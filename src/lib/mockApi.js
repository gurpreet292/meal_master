// Lightweight frontend-only mock API using localStorage
const KEY_USERS = 'mm_users_v1';
const KEY_CURRENT = 'mm_current_user_v1';
const KEY_RECIPES = 'mm_recipes_v1';
const KEY_PLANS = 'mm_plans_v1';
const KEY_LOGS = 'mm_logs_v1';

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
      { id: 'r1', name: 'Smoked Salmon Wrap', calories: 420, protein: 28, carbs: 30, fat: 18, time: '20m', tags: ['seafood', 'lunch'] },
      { id: 'r2', name: 'Scrambled Eggs & Spinach', calories: 320, protein: 22, carbs: 6, fat: 24, time: '10m', tags: ['breakfast', 'vegetarian'] },
      { id: 'r3', name: 'Berry Quinoa Bowl', calories: 380, protein: 12, carbs: 58, fat: 8, time: '15m', tags: ['vegan', 'breakfast'] },
    ];
    write(KEY_RECIPES, sample);
  }
  if (!read(KEY_USERS, null)) write(KEY_USERS, []);
  if (!read(KEY_PLANS, null)) write(KEY_PLANS, {});
  if (!read(KEY_LOGS, null)) write(KEY_LOGS, {});
}

ensureInitialData();

const mockApi = {
  register: ({ name, email, password, preferences = {} }) => {
    const users = read(KEY_USERS, []);
    if (users.find(u => u.email === email)) throw new Error('Email already registered');
    const user = { id: 'u_' + Date.now(), name, email, password, preferences };
    users.push(user);
    write(KEY_USERS, users);
    write(KEY_CURRENT, user);
    return user;
  },

  login: ({ email, password }) => {
    const users = read(KEY_USERS, []);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    write(KEY_CURRENT, user);
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

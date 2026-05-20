import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Check,
  Apple,
  Carrot,
  Milk,
  Coffee,
  ShoppingBasket,
  Package2,
  Sparkles,
  Clock3,
  CircleCheckBig,
  ChefHat,
} from 'lucide-react';
import { useApp } from '@/context/AppProvider';

const getCategoryIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('produce') || n.includes('veg') || n.includes('fruit')) return <Carrot className="w-5 h-5" />;
  if (n.includes('dairy')) return <Milk className="w-5 h-5" />;
  if (n.includes('pantry') || n.includes('grain') || n.includes('spice')) return <Coffee className="w-5 h-5" />;
  return <Apple className="w-5 h-5" />;
};

const categorizeIngredient = (ingredient = '') => {
  const text = ingredient.toLowerCase();
  if (/(spinach|tomato|cucumber|greens|avocado|berries|strawberries|blueberries|lemon|pineapple|sweet potato|asparagus|arugula)/.test(text)) {
    return 'Produce';
  }
  if (/(milk|yogurt|feta|cheese|butter|egg)/.test(text)) {
    return 'Dairy & Eggs';
  }
  if (/(oats|quinoa|tortilla|bread|honey|olive oil|salt|pepper|chia|almonds|garlic|rosemary)/.test(text)) {
    return 'Pantry';
  }
  if (/(salmon|chicken|steak|sirloin)/.test(text)) {
    return 'Protein';
  }
  return 'Other';
};

const fallbackList = [
  { id: 1, name: 'Organic Spinach', category: 'Produce', completed: false, quantity: '2 bunches' },
  { id: 2, name: 'Almond Milk', category: 'Dairy & Eggs', completed: true, quantity: '1 carton' },
  { id: 3, name: 'Quinoa', category: 'Pantry', completed: false, quantity: '1 bag' },
  { id: 4, name: 'Cherry Tomatoes', category: 'Produce', completed: false, quantity: '1 box' },
  { id: 5, name: 'Greek Yogurt', category: 'Dairy & Eggs', completed: false, quantity: '3 tubs' },
];

const Groceries = () => {
  const { plan, recipes } = useApp();
  const [newItemName, setNewItemName] = useState('');

  const plannedMeals = useMemo(() => {
    if (!plan) return [];
    return Object.values(plan)
      .flatMap((dayMeals) => Object.values(dayMeals || {}))
      .flatMap((mealEntries) => mealEntries || [])
      .map((meal) => meal?.name)
      .filter(Boolean);
  }, [plan]);

  const plannedIngredients = useMemo(() => {
    if (plannedMeals.length === 0 || !recipes?.length) return [];

    const recipeMap = new Map(recipes.map((recipe) => [recipe.name.toLowerCase(), recipe]));
    const itemMap = new Map();

    plannedMeals.forEach((mealName) => {
      const match = recipeMap.get(mealName.toLowerCase());
      if (!match?.ingredients?.length) return;

      match.ingredients.forEach((ingredient) => {
        const normalized = ingredient.trim();
        const key = normalized.toLowerCase();
        const existing = itemMap.get(key);

        if (existing) {
          existing.quantity = `${existing.count + 1}x`;
          existing.count += 1;
        } else {
          itemMap.set(key, {
            id: Date.now() + Math.random(),
            name: normalized,
            category: categorizeIngredient(normalized),
            completed: false,
            quantity: '1x',
            count: 1,
          });
        }
      });
    });

    return [...itemMap.values()].map(({ count, ...rest }) => rest);
  }, [plannedMeals, recipes]);

  const [manualItems, setManualItems] = useState([]);

  const mergedList = useMemo(() => {
    const base = plannedIngredients.length > 0 ? plannedIngredients : fallbackList;
    return [...manualItems, ...base];
  }, [manualItems, plannedIngredients]);

  const [completedMap, setCompletedMap] = useState({});

  const list = useMemo(() => {
    return mergedList.map((item) => ({
      ...item,
      completed: completedMap[item.id] ?? item.completed,
    }));
  }, [mergedList, completedMap]);

  const toggleItem = (id) => {
    setCompletedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const cleanName = newItemName.trim();
    setManualItems((prev) => [
      {
        id: Date.now(),
        name: cleanName,
        category: categorizeIngredient(cleanName),
        completed: false,
        quantity: '1x',
      },
      ...prev,
    ]);
    setNewItemName('');
  };

  const groupedList = useMemo(() => {
    return list.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [list]);

  const totalItems = list.length;
  const completedItems = list.filter((i) => i.completed).length;
  const progressPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  const remainingItems = totalItems - completedItems;

  return (
    <div className="min-h-screen bg-cream-base dark:bg-background pb-20 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-16 w-[420px] h-[420px] bg-sage-light/30 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-0 w-[460px] h-[460px] bg-orange-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-cream-border text-sage-dark text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-sage-main" />
            Smart Grocery Planning
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12"
          >
            <div>
              <h1 className="text-5xl font-serif italic text-sage-dark dark:text-sage-light tracking-tight mb-2 flex items-center gap-3">
                <ShoppingBasket className="w-10 h-10 text-sage-main" />
                Grocery List
              </h1>
              <p className="text-sage-muted dark:text-muted-foreground text-lg">
                {completedItems} of {totalItems} items collected
              </p>
              <p className="text-sm text-sage-light mt-1 flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                {plannedIngredients.length > 0
                  ? 'Auto-generated from your weekly plan.'
                  : 'Showing starter list. Add meals in Planner for auto-generated groceries.'}
              </p>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="none" className="text-cream-border dark:text-border" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-sage-main"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '251.2 251.2', strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * progressPercent) / 100 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sage-dark dark:text-sage-light">
                <span className="text-3xl font-bold font-serif italic leading-none">{progressPercent}%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center gap-3 text-sage-dark">
                <ShoppingBasket className="w-5 h-5 text-sage-main" />
                <span className="text-sm font-medium text-sage-muted">Total Items</span>
              </div>
              <p className="text-2xl font-bold text-sage-dark mt-2">{totalItems}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center gap-3 text-sage-dark">
                <CircleCheckBig className="w-5 h-5 text-sage-main" />
                <span className="text-sm font-medium text-sage-muted">Collected</span>
              </div>
              <p className="text-2xl font-bold text-sage-dark mt-2">{completedItems}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center gap-3 text-sage-dark">
                <Clock3 className="w-5 h-5 text-sage-main" />
                <span className="text-sm font-medium text-sage-muted">Remaining</span>
              </div>
              <p className="text-2xl font-bold text-sage-dark mt-2">{remainingItems}</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={addItem}
            className="relative mb-12 max-w-3xl"
          >
            <div className="glass-panel p-2 rounded-full flex gap-2 items-center">
              <ShoppingBasket className="w-5 h-5 text-sage-main ml-4" />
              <input
                type="text"
                placeholder="Add an item..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-3 text-lg outline-none placeholder:text-sage-light text-sage-dark dark:text-foreground"
              />
              <button
                type="submit"
                className="bg-sage-main hover:bg-sage-dark text-white p-3 rounded-full transition-colors flex items-center justify-center"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </motion.form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedList).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="glass-panel rounded-[2rem] p-6"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cream-border dark:border-border/50">
                  <div className="p-2.5 bg-white/50 dark:bg-black/20 rounded-xl text-sage-main">{getCategoryIcon(category)}</div>
                  <h2 className="text-xl font-bold text-sage-dark dark:text-sage-light">{category}</h2>
                </div>

                <ul className="space-y-1">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onClick={() => toggleItem(item.id)}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/40 dark:hover:bg-black/10 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              item.completed ? 'bg-sage-main border-sage-main' : 'border-sage-light group-hover:border-sage-main'
                            }`}
                          >
                            <Check className={`w-4 h-4 text-white transition-opacity ${item.completed ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                          </div>
                          <span
                            className={`text-lg transition-all ${
                              item.completed
                                ? 'line-through text-sage-light dark:text-muted'
                                : 'text-sage-dark dark:text-foreground font-medium'
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        {item.quantity && (
                          <span className="text-sm text-sage-light dark:text-muted-foreground flex items-center gap-1.5">
                            <Package2 className="w-3.5 h-3.5" />
                            {item.quantity}
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groceries;

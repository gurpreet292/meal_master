import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ShoppingCart, Apple, Carrot, Milk, Coffee } from 'lucide-react';
import { useApp } from '@/context/AppProvider';

const getCategoryIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('produce') || n.includes('veg')) return <Carrot className="w-5 h-5" />;
  if (n.includes('dairy')) return <Milk className="w-5 h-5" />;
  if (n.includes('pantry')) return <Coffee className="w-5 h-5" />;
  return <Apple className="w-5 h-5" />;
};

const Groceries = () => {
  const { groceryList: initialList } = useApp();
  const [list, setList] = useState(initialList.length > 0 ? initialList : [
    { id: 1, name: 'Organic Spinach', category: 'Produce', completed: false, quantity: '2 bunches' },
    { id: 2, name: 'Almond Milk', category: 'Dairy', completed: true, quantity: '1 carton' },
    { id: 3, name: 'Quinoa', category: 'Pantry', completed: false, quantity: '1 bag' },
    { id: 4, name: 'Cherry Tomatoes', category: 'Produce', completed: false, quantity: '1 box' },
    { id: 5, name: 'Greek Yogurt', category: 'Dairy', completed: false, quantity: '3 tubs' },
  ]);
  const [newItemName, setNewItemName] = useState('');

  const toggleItem = (id) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setList(prev => [
      { id: Date.now(), name: newItemName, category: 'Other', completed: false, quantity: '1' },
      ...prev
    ]);
    setNewItemName('');
  };

  // Group by category
  const groupedList = useMemo(() => {
    return list.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [list]);

  const totalItems = list.length;
  const completedItems = list.filter(i => i.completed).length;
  const progressPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-cream-base dark:bg-background pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
        
        <div className="max-w-4xl mx-auto">
          {/* Header & Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h1 className="text-5xl font-serif italic text-sage-dark dark:text-sage-light tracking-tight mb-2">
                Grocery List
              </h1>
              <p className="text-sage-muted dark:text-muted-foreground text-lg">
                {completedItems} of {totalItems} items collected
              </p>
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="none" className="text-cream-border dark:text-border" />
                <motion.circle
                  cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="none"
                  className="text-sage-main" strokeLinecap="round"
                  initial={{ strokeDasharray: "251.2 251.2", strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * progressPercent) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sage-dark dark:text-sage-light">
                <span className="text-3xl font-bold font-serif italic leading-none">{progressPercent}%</span>
              </div>
            </div>
          </motion.div>

          {/* Add Item Form */}
          <motion.form 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onSubmit={addItem} 
            className="relative mb-12 max-w-2xl"
          >
            <div className="glass-panel p-2 rounded-full flex gap-2">
              <input
                type="text"
                placeholder="Add an item..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-3 text-lg outline-none placeholder:text-sage-light text-sage-dark dark:text-foreground"
              />
              <button type="submit" className="bg-sage-main hover:bg-sage-dark text-white p-3 rounded-full transition-colors flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </motion.form>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(groupedList).map(([category, items], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="glass-panel rounded-[2rem] p-6"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cream-border dark:border-border/50">
                  <div className="p-2.5 bg-white/50 dark:bg-black/20 rounded-xl text-sage-main">
                    {getCategoryIcon(category)}
                  </div>
                  <h2 className="text-xl font-bold text-sage-dark dark:text-sage-light">{category}</h2>
                </div>
                
                <ul className="space-y-1">
                  <AnimatePresence>
                    {items.map(item => (
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
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-sage-main border-sage-main' : 'border-sage-light group-hover:border-sage-main'}`}>
                            <Check className={`w-4 h-4 text-white transition-opacity ${item.completed ? 'opacity-100' : 'opacity-0'}`} strokeWidth={3} />
                          </div>
                          <span className={`text-lg transition-all ${item.completed ? 'line-through text-sage-light dark:text-muted' : 'text-sage-dark dark:text-foreground font-medium'}`}>
                            {item.name}
                          </span>
                        </div>
                        {item.quantity && (
                          <span className="text-sm text-sage-light dark:text-muted-foreground">{item.quantity}</span>
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

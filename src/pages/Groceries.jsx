import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Plus, Trash2, Download, Edit2, X } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';

const Groceries = () => {
  const [groceryList, setGroceryList] = useState([
    { id: 1, category: 'Proteins', items: ['Chicken Breast (2 lbs)', 'Salmon (1.5 lbs)', 'Eggs (1 dozen)', 'Greek Yogurt (32 oz)'], checked: [] },
    { id: 2, category: 'Vegetables', items: ['Broccoli', 'Spinach', 'Bell Peppers', 'Carrots', 'Tomatoes'], checked: [] },
    { id: 3, category: 'Fruits', items: ['Bananas', 'Blueberries', 'Apples', 'Oranges'], checked: [] },
    { id: 4, category: 'Grains & Carbs', items: ['Brown Rice', 'Quinoa', 'Sweet Potatoes', 'Whole Wheat Bread'], checked: [] },
    { id: 5, category: 'Pantry', items: ['Olive Oil', 'Salt & Pepper', 'Spices', 'Garlic'], checked: [] },
  ]);

  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('Proteins');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Proteins', 'Vegetables', 'Fruits', 'Grains & Carbs', 'Pantry', 'Dairy', 'Frozen'];

  const toggleItem = (categoryId, itemIndex) => {
    setGroceryList(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              checked: cat.checked.includes(itemIndex)
                ? cat.checked.filter(i => i !== itemIndex)
                : [...cat.checked, itemIndex]
            }
          : cat
      )
    );
  };

  const addItem = () => {
    if (!newItem.trim()) return;

    setGroceryList(prev =>
      prev.map(cat =>
        cat.category === newCategory
          ? { ...cat, items: [...cat.items, newItem] }
          : cat
      )
    );
    setNewItem('');
    setShowAddForm(false);
  };

  const removeItem = (categoryId, itemIndex) => {
    setGroceryList(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, items: cat.items.filter((_, idx) => idx !== itemIndex) }
          : cat
      )
    );
  };

  const addCategory = () => {
    const newCat = prompt('Enter category name:');
    if (newCat && !groceryList.some(c => c.category === newCat)) {
      setGroceryList(prev => [...prev, { id: Date.now(), category: newCat, items: [], checked: [] }]);
    }
  };

  const downloadList = () => {
    let text = 'GROCERY LIST\n' + '='.repeat(50) + '\n\n';
    groceryList.forEach(cat => {
      text += cat.category.toUpperCase() + '\n';
      text += '-'.repeat(30) + '\n';
      cat.items.forEach((item, idx) => {
        const checked = cat.checked.includes(idx) ? '[✓]' : '[ ]';
        text += `${checked} ${item}\n`;
      });
      text += '\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    a.click();
  };

  const getTotalItems = () => groceryList.reduce((sum, cat) => sum + cat.items.length, 0);
  const getCheckedItems = () => groceryList.reduce((sum, cat) => sum + cat.checked.length, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            Grocery List
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Organize your shopping with a smart grocery list</p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Progress & Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm sm:text-base text-foreground">Shopping Progress</h3>
              <span className="text-sm text-muted-foreground">{getCheckedItems()} of {getTotalItems()}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getTotalItems() > 0 ? (getCheckedItems() / getTotalItems()) * 100 : 0}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 flex-1 sm:flex-auto"
              size="lg"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
            <Button
              onClick={addCategory}
              variant="secondary"
              className="flex items-center gap-2 flex-1 sm:flex-auto"
              size="lg"
            >
              <Edit2 className="w-4 h-4" />
              New Category
            </Button>
            <Button
              onClick={downloadList}
              variant="outline"
              className="flex items-center gap-2 flex-1 sm:flex-auto"
              size="lg"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </motion.div>

        {/* Grocery Categories */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="space-y-5 sm:space-y-6"
        >
          {groceryList.map((category) => (
            <motion.div
              key={category.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="card-elevated">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <span className="text-2xl">
                      {category.category === 'Proteins' && '🍗'}
                      {category.category === 'Vegetables' && '🥦'}
                      {category.category === 'Fruits' && '🍎'}
                      {category.category === 'Grains & Carbs' && '🌾'}
                      {category.category === 'Pantry' && '🫘'}
                      {category.category === 'Dairy' && '🥛'}
                      {category.category === 'Frozen' && '🧊'}
                      {![
                        'Proteins',
                        'Vegetables',
                        'Fruits',
                        'Grains & Carbs',
                        'Pantry',
                        'Dairy',
                        'Frozen'
                      ].includes(category.category) && '📦'}
                    </span>
                    {category.category}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {category.checked.length} of {category.items.length} items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {category.items.length > 0 ? (
                    <motion.div
                      className="space-y-2 sm:space-y-3"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.02 }
                        }
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
                          className="flex items-center gap-2 sm:gap-3 group"
                        >
                          <button
                            onClick={() => toggleItem(category.id, idx)}
                            className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                              category.checked.includes(idx)
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {category.checked.includes(idx) && (
                              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            )}
                          </button>
                          <span
                            className={`flex-1 text-xs sm:text-sm transition-all ${
                              category.checked.includes(idx)
                                ? 'line-through text-gray-400'
                                : 'text-foreground'
                            }`}
                          >
                            {item}
                          </span>
                          <button
                            onClick={() => removeItem(category.id, idx)}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-center text-muted-foreground text-xs sm:text-sm py-4">No items yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardContent className="pt-6 sm:pt-8">
              <h3 className="font-bold text-base sm:text-lg text-foreground mb-4 flex items-center gap-2">
                💡 Shopping Tips
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Check off items as you shop to stay organized</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Download your list to take it with you on your phone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Add items from your meal plan to simplify shopping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Shop with a full stomach to avoid impulse buys</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Add Item to Grocery List</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="e.g., Chicken Breast (2 lbs)"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') addItem();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  >
                    {groceryList.map(cat => (
                      <option key={cat.id} value={cat.category}>{cat.category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addItem}
                    disabled={!newItem.trim()}
                    className="flex-1"
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Groceries;

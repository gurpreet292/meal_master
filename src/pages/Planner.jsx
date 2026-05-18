import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Calendar, Sparkles, Save, Plus, Trash2, Download, Share2 } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const Planner = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newMeal, setNewMeal] = useState('');
  const [newMealType, setNewMealType] = useState('Breakfast');
  const { savePlan, user, recipes } = useApp();

  // Initialize meal plan
  useEffect(() => {
    const initialPlan = {};
    days.forEach(day => {
      initialPlan[day] = {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snack: [],
      };
    });
    setMealPlan(initialPlan);
  }, []);

  const addMeal = (day, mealType, mealName) => {
    if (!mealName.trim()) return;
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: [...(prev[day][mealType] || []), { id: Date.now(), name: mealName }]
      }
    }));
    setNewMeal('');
  };

  const removeMeal = (day, mealType, id) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter(m => m.id !== id)
      }
    }));
  };

  const handleSavePlan = () => {
    try {
      if (user) {
        savePlan(mealPlan);
        alert('Meal plan saved successfully!');
      }
    } catch (e) {
      alert('Error saving meal plan: ' + e.message);
    }
  };

  const calculateNutrition = (day, mealType) => {
    const meals = mealPlan[day]?.[mealType] || [];
    let totalCals = 0, totalProtein = 0;
    meals.forEach(meal => {
      totalCals += 350;
      totalProtein += 25;
    });
    return { totalCals, totalProtein };
  };

  const getTotalWeeklyCalories = () => {
    let total = 0;
    days.forEach(day => {
      mealTypes.forEach(mealType => {
        const meals = mealPlan[day]?.[mealType] || [];
        total += meals.length * 350;
      });
    });
    return total;
  };

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
            <Calendar className="w-8 h-8 text-green-700" />
            Weekly Meal Planner
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Plan your meals for the week and maintain your goals</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row gap-3 flex-wrap"
        >
          <Button className="flex items-center gap-2 flex-1 sm:flex-auto">
            <Sparkles className="w-4 h-4" />
            AI Suggest Meals
          </Button>
          <Button variant="secondary" onClick={handleSavePlan} className="flex items-center gap-2 flex-1 sm:flex-auto">
            <Save className="w-4 h-4" />
            Save Plan
          </Button>
          <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-auto">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-auto">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </motion.div>

        {/* Weekly Grid */}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {days.map((day, dayIdx) => (
            <motion.div
              key={day}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="card-elevated h-full flex flex-col">
                <CardHeader className="pb-3 sm:pb-4 border-b border-border">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <span className="text-green-600 font-bold">{dayIdx + 1}</span>
                    <span className="truncate">{day}</span>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {calculateNutrition(day, 'Breakfast').totalCals + 
                     calculateNutrition(day, 'Lunch').totalCals +
                     calculateNutrition(day, 'Dinner').totalCals +
                     calculateNutrition(day, 'Snack').totalCals} cal
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto py-3 sm:py-4 space-y-3 sm:space-y-4">
                  {mealTypes.map((mealType) => (
                    <div key={mealType} className="space-y-2">
                      <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                        {mealType}
                      </div>

                      {/* Meal Items */}
                      <div className="space-y-2">
                        {(mealPlan[day]?.[mealType] || []).map((meal) => (
                          <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg group hover:bg-green-100 transition"
                          >
                            <span className="text-xs sm:text-sm text-foreground truncate">{meal.name}</span>
                            <button
                              onClick={() => removeMeal(day, mealType, meal.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add Meal Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedDay({ day, mealType });
                        }}
                        className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition text-xs sm:text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        Add
                      </motion.button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">{getTotalWeeklyCalories()}</div>
                <div className="text-xs sm:text-sm text-orange-600 font-medium mt-1">Total Calories</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{days.length}</div>
                <div className="text-xs sm:text-sm text-blue-600 font-medium mt-1">Days Planned</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{Math.round(getTotalWeeklyCalories() / 7)}</div>
                <div className="text-xs sm:text-sm text-green-600 font-medium mt-1">Avg Daily</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">100%</div>
                <div className="text-xs sm:text-sm text-purple-600 font-medium mt-1">Complete</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Tips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="pt-6 sm:pt-8">
              <h3 className="font-bold text-base sm:text-lg text-foreground mb-4">📋 Planning Tips</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Plan your meals at the beginning of the week for better prep</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Mix proteins, carbs, and healthy fats in each meal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Save your plan to track and adjust as you go</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Meal Modal */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDay(null)}
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
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  Add {selectedDay?.mealType} for {selectedDay?.day}
                </h2>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                {/* Recipe Suggestions */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-3">Select or enter meal:</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                    {recipes?.slice(0, 5).map(recipe => (
                      <motion.button
                        key={recipe.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          addMeal(selectedDay.day, selectedDay.mealType, recipe.name);
                          setSelectedDay(null);
                        }}
                        className="w-full text-left p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition text-xs sm:text-sm"
                      >
                        <p className="font-medium text-foreground">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground">{recipe.calories} cal • {recipe.protein}g protein</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Custom Meal Input */}
                <input
                  type="text"
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  placeholder="Or type custom meal..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addMeal(selectedDay.day, selectedDay.mealType, newMeal);
                      setSelectedDay(null);
                    }
                  }}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDay(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      addMeal(selectedDay.day, selectedDay.mealType, newMeal);
                      setSelectedDay(null);
                    }}
                    disabled={!newMeal.trim()}
                    className="flex-1"
                  >
                    Add Meal
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

export default Planner;

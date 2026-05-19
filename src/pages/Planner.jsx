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

  const dayAssets = {
    Monday: { img: '/berry_quinoa_topdown_1779170262202.png', title: 'BERRY QUINOA BOWL', subtitle: 'MATCHA AVOCADO SMOOTHIE', desc: 'Berries and quinoa are packed with polyphenols and plant protein for recovery. Matcha-avocado smoothie adds creamy calm and steady energy.' },
    Tuesday: { img: '/scrambled_eggs_topdown_1779170230608.png', title: 'SCRAMBLED EGGS', subtitle: 'ICED MATCHA LATTE', desc: 'Mushroom and spinach deliver B vitamins and minerals to fight stress. Matcha latte supports focus and calm clarity.' },
    Wednesday: { img: '/salmon_wrap_topdown_1779170173897.png', title: 'SMOKED SALMON WRAP', subtitle: 'PEACH OOLONG MATCHA', desc: 'Salmon and arugula are rich in omega-3 and chlorophyll, great for reducing stress and inflammation. Peach oolong matcha is refreshing and mood-lifting.' },
    Thursday: { img: '/berry_quinoa_topdown_1779170262202.png', title: 'COTTAGE CHEESE', subtitle: 'SUPERBA MATCHA', desc: 'Pineapple and cheese provide enzymes and protein for digestion. Superba matcha gently restores before a new week begins.' },
    Friday: { img: '/scrambled_eggs_topdown_1779170230608.png', title: 'AVOCADO TOAST', subtitle: 'ICED GREEN TEA', desc: 'Healthy fats to fuel your brain and keep you satiated throughout the final workday.' },
    Saturday: { img: '/salmon_wrap_topdown_1779170173897.png', title: 'CHICKEN SALAD', subtitle: 'DETOX WATER', desc: 'Light and refreshing weekend meal to keep your energy up.' },
    Sunday: { img: '/berry_quinoa_topdown_1779170262202.png', title: 'PROTEIN PANCAKES', subtitle: 'BLACK COFFEE', desc: 'A hearty, comforting start to a relaxing Sunday morning.' },
  };

  const ArrowSVG = ({ flip = false }) => (
    <svg 
      className={`absolute hidden md:block w-16 h-16 text-sage-dark ${flip ? 'right-[-4rem] top-4 transform scale-x-[-1]' : 'left-[-4rem] top-4'}`} 
      viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10,50 Q40,10 90,50" stroke="currentColor" strokeWidth="2" fill="transparent" />
      <path d="M80,40 L90,50 L80,60" stroke="currentColor" strokeWidth="2" fill="transparent" />
    </svg>
  );

  return (
    <div className="min-h-screen pb-20 bg-cream-base dark:bg-card">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-cream-base/95 dark:bg-card/95 backdrop-blur-sm border-b border-cream-border dark:border-border"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif italic text-sage-dark dark:text-sage-light tracking-tight">
              Weekly Plan
            </h1>
            <p className="text-sage-muted dark:text-muted-foreground text-sm mt-1">7-Day Cortisol-Friendly Meals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-sage-dark text-sage-dark hover:bg-sage-dark/10 dark:border-sage dark:text-sage">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button className="bg-sage-main hover:bg-sage-dark text-white">
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {days.map((day, dayIdx) => {
          const isEven = dayIdx % 2 === 0;
          const data = dayAssets[day];
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2 flex justify-center relative">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                  className="relative w-64 h-64 sm:w-80 sm:h-80"
                >
                  <img 
                    src={data.img} 
                    alt={data.title}
                    className="w-full h-full object-cover rounded-full shadow-2xl shadow-sage-dark/20 mix-blend-multiply dark:mix-blend-normal border-4 border-white/50"
                  />
                  {/* Decorative element like a glass of matcha next to it could go here */}
                </motion.div>
                
                {/* Day Label Overlaid */}
                <h2 className={`absolute ${isEven ? '-bottom-6 -right-4' : '-bottom-6 -left-4'} text-5xl sm:text-6xl font-serif italic font-bold text-sage-dark dark:text-sage opacity-90 drop-shadow-sm`}>
                  {day}
                </h2>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 relative space-y-4">
                <ArrowSVG flip={!isEven} />
                
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-widest text-sage-main dark:text-sage-light uppercase">
                    {data.title}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold tracking-wider text-sage-light dark:text-sage/80 uppercase">
                    {data.subtitle}
                  </h4>
                </div>

                <div className="w-full border-t-[3px] border-dotted border-sage-light dark:border-sage/30 my-4" />

                <p className="text-sage-muted dark:text-muted-foreground text-sm leading-relaxed max-w-sm">
                  {data.desc}
                </p>

                {/* Actual dynamically added meals below the featured one */}
                <div className="pt-4 space-y-2">
                  {mealTypes.map(mealType => {
                    const meals = mealPlan[day]?.[mealType] || [];
                    if (meals.length === 0) return null;
                    return (
                      <div key={mealType} className="flex gap-2 text-xs">
                        <span className="font-semibold text-sage-dark dark:text-sage-light uppercase">{mealType}:</span>
                        <span className="text-sage-muted dark:text-muted-foreground">
                          {meals.map(m => m.name).join(', ')}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Add Button */}
                  <button
                    onClick={() => setSelectedDay({ day, mealType: 'Lunch' })}
                    className="mt-2 text-xs font-semibold text-sage-light hover:text-sage-main dark:text-sage dark:hover:text-sage-light flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Customize Day
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Meal Modal (Preserved logic) */}
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
                  Add Meal for {selectedDay?.day}
                </h2>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex gap-2 mb-4">
                  {mealTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedDay({ ...selectedDay, mealType: type })}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedDay.mealType === type ? 'bg-sage-main text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Custom Meal Input */}
                <input
                  type="text"
                  value={newMeal}
                  onChange={(e) => setNewMeal(e.target.value)}
                  placeholder="Type custom meal..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-main/50 text-sm"
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
                    className="flex-1 bg-sage-main hover:bg-sage-dark text-white border-none"
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

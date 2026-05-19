import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Sparkles, Droplets, Flame, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { ProgressRing, MacroBar, StatCard, NutritionCard } from '@/components/ui/MealComponents';
import { useApp } from '@/context/AppProvider';

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const { recipes } = useApp();

  // Mock Data
  const calorieData = { consumed: 1450, goal: 1850, percentage: 78 };
  const macroData = [
    { name: 'Protein', value: 95, target: 120, color: '#FFB86B' },
    { name: 'Carbs', value: 150, target: 200, color: '#7BAE7F' },
    { name: 'Fats', value: 45, target: 65, color: '#88CCF1' }
  ];

  const weeklyData = [
    { day: 'M', calories: 1800, target: 1850 },
    { day: 'T', calories: 1950, target: 1850 },
    { day: 'W', calories: 1700, target: 1850 },
    { day: 'T', calories: 1850, target: 1850 },
    { day: 'F', calories: 2100, target: 1850 },
    { day: 'S', calories: 1900, target: 1850 },
    { day: 'S', calories: 1450, target: 1850 },
  ];

  // Pick top 2 recipes for recommendations
  const meals = recipes ? recipes.slice(0, 2) : [];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="min-h-screen bg-cream-base dark:bg-background pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-cream-border dark:border-border pb-8"
        >
          <div>
            <h1 className="text-5xl font-serif italic text-sage-dark dark:text-sage-light tracking-tight mb-2">
              Good Morning, Gurpreet.
            </h1>
            <p className="text-sage-muted dark:text-muted-foreground text-lg">Your health journey, beautifully tracked.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-sage-dark text-sage-dark hover:bg-sage-dark/5 dark:border-sage dark:text-sage rounded-full px-6">
              <Calendar className="w-4 h-4 mr-2" /> Today
            </Button>
            <Button className="bg-sage-main hover:bg-sage-dark text-white rounded-full px-6 shadow-md shadow-sage-main/20">
              <Plus className="w-4 h-4 mr-2" /> Log Meal
            </Button>
          </div>
        </motion.div>

        {/* Bento Box Grid */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6"
        >
          
          {/* Main Progress Ring - Spans 5 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-5 md:col-span-4">
            <div className="glass-panel rounded-[2rem] p-8 h-full flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage-main/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              
              <h3 className="text-xl font-bold text-sage-dark dark:text-sage-light mb-8">Daily Energy</h3>
              
              <ProgressRing percentage={calorieData.percentage} size={220} color="sage" strokeWidth={14}>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-sage-dark dark:text-foreground tracking-tighter">
                    {calorieData.consumed}
                  </span>
                  <span className="text-sm font-medium text-sage-muted dark:text-muted-foreground mt-1">/ {calorieData.goal} kcal</span>
                </div>
              </ProgressRing>
              
              <div className="mt-8 flex gap-3">
                <Badge className="bg-sage-main/10 text-sage-main hover:bg-sage-main/20 border-none px-4 py-1.5 rounded-full">On Track</Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-none px-4 py-1.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> 2%
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Macros & Stats Stack - Spans 4 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-4 md:col-span-2 space-y-6 flex flex-col">
            <div className="glass-panel rounded-[2rem] p-8 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-sage-dark dark:text-sage-light">Macronutrients</h3>
                <Sparkles className="w-5 h-5 text-soft-orange" />
              </div>
              <div className="space-y-6">
                {macroData.map((macro) => (
                  <MacroBar
                    key={macro.name}
                    label={macro.name}
                    value={macro.value}
                    max={macro.target}
                    color={macro.name === 'Protein' ? 'orange' : macro.name === 'Carbs' ? 'sage' : 'blue'}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 h-32">
              <div className="glass-panel rounded-[1.5rem] p-4 flex flex-col justify-center items-center hover:-translate-y-1 transition-transform">
                <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                <span className="text-xl font-bold text-sage-dark dark:text-foreground">2.5<span className="text-sm text-sage-muted">/3L</span></span>
              </div>
              <div className="glass-panel rounded-[1.5rem] p-4 flex flex-col justify-center items-center hover:-translate-y-1 transition-transform">
                <Flame className="w-6 h-6 text-orange-500 mb-2" />
                <span className="text-xl font-bold text-sage-dark dark:text-foreground">45<span className="text-sm text-sage-muted">m</span></span>
              </div>
            </div>
          </motion.div>

          {/* Weekly Chart - Spans 3 cols */}
          <motion.div variants={itemVariants} className="lg:col-span-3 md:col-span-2">
            <div className="glass-panel rounded-[2rem] p-8 h-full flex flex-col">
              <h3 className="text-lg font-bold text-sage-dark dark:text-sage-light mb-6">This Week</h3>
              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="calories" fill="#A5C8A7" radius={[4, 4, 4, 4]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 pt-4 border-t border-cream-border dark:border-border/50">
                <p className="text-sm text-sage-muted dark:text-muted-foreground flex items-center justify-between">
                  Avg. Intake <span className="font-bold text-sage-dark dark:text-sage">1,820 kcal</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Featured Recommendations - Full Width */}
          <motion.div variants={itemVariants} className="lg:col-span-12 mt-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif italic font-bold text-sage-dark dark:text-sage-light">Chef's Suggestions</h2>
              <button className="text-sm font-medium text-sage-main hover:text-sage-dark dark:text-sage flex items-center gap-1 group">
                View All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="glass-panel rounded-[2rem] p-4 flex gap-4 items-center group cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-cream-border">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sage-dark dark:text-foreground line-clamp-1">{meal.name}</h4>
                    <p className="text-xs text-sage-muted dark:text-muted-foreground mb-2">{meal.calories} cal • {meal.time}</p>
                    <div className="flex gap-1">
                      <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{meal.protein}g P</span>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{meal.carbs}g C</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="glass-panel rounded-[2rem] p-6 flex flex-col justify-center items-center text-center border-dashed border-2 border-sage-light bg-transparent hover:bg-sage-main/5 cursor-pointer transition-colors">
                <div className="w-12 h-12 rounded-full bg-sage-main/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-sage-main" />
                </div>
                <h4 className="font-bold text-sage-dark dark:text-foreground">Generate More</h4>
                <p className="text-xs text-sage-muted dark:text-muted-foreground mt-1">Using your dietary preferences</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

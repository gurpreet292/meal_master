import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Plus, X, Calendar, Flame, Droplets, Zap, Activity, Brain } from 'lucide-react';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppProvider';

const Tracking = () => {
  const [showAddFood, setShowAddFood] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodCals, setFoodCals] = useState('');

  const { logFood, logs: appLogs, user } = useApp();

  const weeklyData = [
    { day: 'Mon', weight: 72.5, score: 85 },
    { day: 'Tue', weight: 72.3, score: 88 },
    { day: 'Wed', weight: 72.1, score: 92 },
    { day: 'Thu', weight: 72.0, score: 90 },
    { day: 'Fri', weight: 71.8, score: 95 },
    { day: 'Sat', weight: 71.7, score: 91 },
    { day: 'Sun', weight: 71.6, score: 94 },
  ];

  const todayLogs = appLogs?.filter(log => log.date === new Date().toISOString().split('T')[0]) || [];
  const totalCalories = todayLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
  const totalProtein = todayLogs.reduce((sum, log) => sum + (log.protein || 0), 0);
  const totalCarbs = todayLogs.reduce((sum, log) => sum + (log.carbs || 0), 0);
  const totalFat = todayLogs.reduce((sum, log) => sum + (log.fat || 0), 0);

  // Theming colors
  const SAGE = '#5c7a52';
  const ORANGE = '#FFB86B';
  const LIGHT_SAGE = '#b4c0ad';

  const macroData = [
    { name: 'Protein', value: Math.min(100, Math.round((totalProtein / 120) * 100)), fill: SAGE },
    { name: 'Carbs', value: Math.min(100, Math.round((totalCarbs / 200) * 100)), fill: LIGHT_SAGE },
    { name: 'Fats', value: Math.min(100, Math.round((totalFat / 65) * 100)), fill: ORANGE },
  ];

  const handleAddFood = () => {
    if (foodName && foodCals) {
      try {
        logFood({
          name: foodName,
          calories: parseInt(foodCals),
          protein: Math.round(parseInt(foodCals) * 0.2 / 4),
          carbs: Math.round(parseInt(foodCals) * 0.5 / 4),
          fat: Math.round(parseInt(foodCals) * 0.3 / 9),
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString(),
        });
        setFoodName('');
        setFoodCals('');
        setShowAddFood(false);
      } catch (e) {
        console.error('Error logging food:', e);
      }
    }
  };

  const CircularProgress = ({ value, max, label, icon: Icon, colorClass, strokeColor }) => {
    const percentage = Math.min(100, (value / max) * 100);
    const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;
    
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border border-cream-border rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-cream-border" />
            <motion.circle
              initial={{ strokeDasharray: "251.2 251.2", strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="8" fill="none" strokeLinecap="round"
            />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center ${colorClass}`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
        <h4 className="text-sage-dark font-bold text-xl">{value} <span className="text-sm font-normal text-sage-muted">/ {max}</span></h4>
        <p className="text-xs font-semibold uppercase tracking-widest text-sage-light mt-1">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream-base pb-20 font-sans relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-light/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-20 z-30 bg-cream-base/80 backdrop-blur-xl border-b border-cream-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-2 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-serif italic text-sage-dark tracking-tight">Analytics</h1>
            <p className="text-sage-muted text-sm mt-1">Holistic wellness & nutrition tracking</p>
          </div>
          <Button onClick={() => setShowAddFood(true)} className="bg-sage-main hover:bg-sage-dark text-white rounded-full flex items-center gap-2 shadow-lg shadow-sage-main/20">
            <Plus className="w-5 h-5" /> Log Meal
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 relative z-10">
        
        {/* Progress Rings - Bento Grid Top */}
        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <CircularProgress value={totalCalories} max={1850} label="Calories" icon={Flame} colorClass="text-[#FFB86B]" strokeColor="#FFB86B" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <CircularProgress value={totalProtein} max={120} label="Protein (g)" icon={Activity} colorClass="text-sage-main" strokeColor={SAGE} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <CircularProgress value={totalCarbs} max={200} label="Carbs (g)" icon={Zap} colorClass="text-sage-light" strokeColor={LIGHT_SAGE} />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <CircularProgress value={totalFat} max={65} label="Fats (g)" icon={Droplets} colorClass="text-orange-300" strokeColor="#FDBA74" />
          </motion.div>
        </motion.div>

        {/* Bento Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart - Wellness Score Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-md border border-cream-border p-8 rounded-[2rem] shadow-sm h-full">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-sage-dark">Wellness Score</h3>
                  <p className="text-sm text-sage-muted">7-day mood & energy integration</p>
                </div>
                <div className="px-4 py-2 bg-sage-main/10 rounded-full text-sage-main font-bold text-sm">
                  +12% vs last week
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={SAGE} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={SAGE} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0dacd" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8b9d83', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b9d83', fontSize: 12 }} domain={[70, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: SAGE, fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="score" stroke={SAGE} strokeWidth={4} dot={{ r: 6, fill: SAGE, strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* AI Insights Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-sage-dark text-white p-8 rounded-[2rem] shadow-xl h-full relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-serif italic font-bold">AI Insights</h3>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-sm text-sage-light mb-2">Macro Analysis</p>
                  <p className="font-medium leading-relaxed">Your protein intake is slightly below optimal for your activity level. Try adding a Greek yogurt snack today.</p>
                </div>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-sm text-sage-light mb-2">Energy Correlation</p>
                  <p className="font-medium leading-relaxed">Your wellness score peaked on days with &gt;100g of protein. Keep maintaining this macro balance.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Today's Meals - Cinematic List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="bg-white/60 backdrop-blur-md border border-cream-border p-8 rounded-[2rem] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-sage-dark">Today's Log</h3>
              <span className="text-sage-muted font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>

            {todayLogs.length > 0 ? (
              <div className="grid gap-4">
                {todayLogs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                    className="group flex items-center justify-between p-5 bg-white border border-cream-border rounded-2xl hover:border-sage-main hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cream-base flex items-center justify-center text-sage-dark group-hover:bg-sage-main/10 transition-colors">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-sage-dark">{log.name}</p>
                        <p className="text-sm text-sage-muted">{log.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-sage-main">{log.calories} <span className="text-sm font-normal text-sage-muted">kcal</span></p>
                      <div className="flex gap-3 text-xs font-semibold text-sage-light mt-1">
                        <span>P: {log.protein}g</span>
                        <span>C: {log.carbs}g</span>
                        <span>F: {log.fat}g</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-cream-border rounded-full flex items-center justify-center mb-6">
                  <Flame className="w-10 h-10 text-sage-light" />
                </div>
                <h4 className="text-xl font-bold text-sage-dark mb-2">No meals logged yet</h4>
                <p className="text-sage-muted max-w-md text-center mb-6">Your body is an engine. Track your fuel to ensure you're running at optimal performance.</p>
                <Button onClick={() => setShowAddFood(true)} className="bg-sage-dark text-white rounded-full">
                  Log Your First Meal
                </Button>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Add Food Modal */}
      <AnimatePresence>
        {showAddFood && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAddFood(false)}
            className="fixed inset-0 bg-sage-dark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-serif italic font-bold text-sage-dark">Log Food</h2>
                  <button onClick={() => setShowAddFood(false)} className="p-2 bg-cream-base rounded-full text-sage-muted hover:text-sage-dark transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-sage-light mb-2">Food Name</label>
                    <input
                      type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)}
                      placeholder="e.g., Matcha Latte"
                      className="w-full px-5 py-4 bg-cream-base border-none rounded-xl focus:ring-2 focus:ring-sage-main outline-none text-sage-dark placeholder:text-sage-light transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-sage-light mb-2">Total Calories</label>
                    <input
                      type="number" value={foodCals} onChange={(e) => setFoodCals(e.target.value)}
                      placeholder="e.g., 250"
                      className="w-full px-5 py-4 bg-cream-base border-none rounded-xl focus:ring-2 focus:ring-sage-main outline-none text-sage-dark placeholder:text-sage-light transition-shadow"
                    />
                  </div>
                  <div className="pt-4 flex gap-4">
                    <Button onClick={() => setShowAddFood(false)} variant="outline" className="flex-1 rounded-full border-sage-light text-sage-dark py-6">
                      Cancel
                    </Button>
                    <Button onClick={handleAddFood} disabled={!foodName || !foodCals} className="flex-1 rounded-full bg-sage-main hover:bg-sage-dark text-white py-6">
                      Add to Log
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tracking;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Plus, X, Calendar, Flame, Droplets, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from '@/components/ui';
import { StatCard } from '@/components/ui/MealComponents';
import { useApp } from '@/context/AppProvider';

const Tracking = () => {
  const [showAddFood, setShowAddFood] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodCals, setFoodCals] = useState('');

  const { logFood, logs: appLogs, user } = useApp();

  const weeklyData = [
    { day: 'Mon', weight: 72.5, target: 71 },
    { day: 'Tue', weight: 72.3, target: 71 },
    { day: 'Wed', weight: 72.1, target: 71 },
    { day: 'Thu', weight: 72.0, target: 71 },
    { day: 'Fri', weight: 71.8, target: 71 },
    { day: 'Sat', weight: 71.7, target: 71 },
    { day: 'Sun', weight: 71.6, target: 71 },
  ];

  const todayLogs = appLogs?.filter(log => log.date === new Date().toISOString().split('T')[0]) || [];
  const totalCalories = todayLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
  const totalProtein = todayLogs.reduce((sum, log) => sum + (log.protein || 0), 0);
  const totalCarbs = todayLogs.reduce((sum, log) => sum + (log.carbs || 0), 0);
  const totalFat = todayLogs.reduce((sum, log) => sum + (log.fat || 0), 0);

  const macroData = [
    { name: 'Protein', value: Math.min(100, Math.round((totalProtein / 120) * 100)), fill: '#3B82F6' },
    { name: 'Carbs', value: Math.min(100, Math.round((totalCarbs / 200) * 100)), fill: '#10B981' },
    { name: 'Fats', value: Math.min(100, Math.round((totalFat / 65) * 100)), fill: '#F59E0B' },
  ];

  const dailyData = appLogs
    ?.slice(-7)
    ?.map((log, idx) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx],
      calories: log.calories || 0,
      target: 1850,
    })) || [];

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
            <Zap className="w-8 h-8 text-orange-500" />
            Nutrition Tracking
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">Monitor your daily intake and progress</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <StatCard icon={Flame} label="Calories" value={totalCalories} unit="/ 1850" color="orange" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <StatCard icon={Droplets} label="Protein" value={totalProtein} unit="/ 120g" color="blue" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <StatCard icon={Zap} label="Carbs" value={totalCarbs} unit="/ 200g" color="green" />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <StatCard icon={TrendingUp} label="Fats" value={totalFat} unit="/ 65g" color="yellow" />
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weight Trend */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Weight Trend</CardTitle>
                <CardDescription className="text-xs sm:text-sm">7-day weight progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[70, 73]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                      labelStyle={{ color: '#000' }}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
                    <Line type="monotone" dataKey="target" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Macro Distribution */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="card-elevated">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Macro Breakdown</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Today's macros</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Daily Calories Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <Card className="card-elevated">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Daily Calories</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Last 7 days vs target</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                    labelStyle={{ color: '#000' }}
                  />
                  <Bar dataKey="calories" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="target" fill="#D1D5DB" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Meals */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="card-elevated">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Today's Meals</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{new Date().toLocaleDateString()}</CardDescription>
              </div>
              <Button size="sm" onClick={() => setShowAddFood(true)} className="mt-4 sm:mt-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Food
              </Button>
            </CardHeader>
            <CardContent>
              {todayLogs.length > 0 ? (
                <div className="space-y-3">
                  {todayLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm sm:text-base text-foreground">{log.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{log.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm sm:text-base text-orange-600">{log.calories} cal</p>
                        <p className="text-xs text-muted-foreground">P: {log.protein}g C: {log.carbs}g F: {log.fat}g</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8 text-sm">No meals logged yet. Add your first meal!</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-6 sm:pt-8">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                💡 Daily Insights
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-foreground">You're {totalCalories > 1850 ? 'above' : 'below'} your daily calorie goal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-foreground">Protein intake: {totalProtein}g - {totalProtein >= 120 ? 'Great!' : 'Try to increase'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-foreground">Stay hydrated and you're on track!</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Food Modal */}
      <AnimatePresence>
        {showAddFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddFood(false)}
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
                <h2 className="text-xl font-bold text-foreground">Log Food</h2>
                <button
                  onClick={() => setShowAddFood(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Food Name</label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g., Grilled Chicken Breast"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Calories</label>
                  <input
                    type="number"
                    value={foodCals}
                    onChange={(e) => setFoodCals(e.target.value)}
                    placeholder="e.g., 350"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddFood(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddFood}
                    disabled={!foodName || !foodCals}
                    className="flex-1"
                  >
                    Add Food
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

export default Tracking;

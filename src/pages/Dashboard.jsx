import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Sparkles, Droplets, Flame, TrendingUp, Calendar, Settings } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';
import { ProgressRing, MacroBar, StatCard, NutritionCard } from '@/components/ui/MealComponents';

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState('today');

  // Mock Data
  const calorieData = {
    consumed: 1450,
    goal: 1850,
    percentage: 78,
  };

  const macroData = [
    { name: 'Protein', value: 95, target: 120, color: '#FFB86B' },
    { name: 'Carbs', value: 150, target: 200, color: '#7BAE7F' },
    { name: 'Fats', value: 45, target: 65, color: '#88CCF1' }
  ];

  const weeklyData = [
    { day: 'Mon', calories: 1800, target: 1850 },
    { day: 'Tue', calories: 1950, target: 1850 },
    { day: 'Wed', calories: 1700, target: 1850 },
    { day: 'Thu', calories: 1850, target: 1850 },
    { day: 'Fri', calories: 2100, target: 1850 },
    { day: 'Sat', calories: 1900, target: 1850 },
    { day: 'Sun', calories: 1450, target: 1850 },
  ];

  const meals = [
    { name: 'Grilled Salmon Salad', calories: 350, protein: 35, carbs: 25, fat: 12, time: '15 min', rating: 4.8, image: null },
    { name: 'Veggie Smoothie Bowl', calories: 280, protein: 12, carbs: 45, fat: 8, time: '5 min', rating: 4.6, image: null },
    { name: 'Quinoa Buddha Bowl', calories: 420, protein: 18, carbs: 55, fat: 14, time: '20 min', rating: 4.9, image: null },
  ];

  const recommendations = [
    { emoji: '💧', label: 'Water', value: '2.5L / 3L', color: 'blue' },
    { emoji: '🚶', label: 'Steps', value: '8,234 / 10K', color: 'sage' },
    { emoji: '😴', label: 'Sleep', value: '7.5 / 8h', color: 'orange' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Good Morning, Gurpreet 👋
            </h1>
            <p className="text-muted-foreground">Let's crush your health goals today</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Today</span>
            </Button>
            <Button size="md" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Log Meal</span>
            </Button>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calorie Overview */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Daily Progress</span>
                    <Sparkles className="w-5 h-5 text-soft-orange" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Calories Progress */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                      <ProgressRing percentage={calorieData.percentage} size={180} color="sage">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Calories Left</div>
                          <div className="text-lg font-bold text-foreground">
                            {calorieData.goal - calorieData.consumed} kcal
                          </div>
                        </div>
                      </ProgressRing>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm font-medium text-foreground mb-2">Goal Progress</div>
                        <div className="text-3xl font-bold text-foreground">
                          {calorieData.consumed}
                          <span className="text-lg text-muted-foreground"> / {calorieData.goal} kcal</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You're on track! Keep it up to meet your daily goals.
                      </p>
                      <div className="flex gap-2 pt-4">
                        <Badge variant="default">On Track</Badge>
                        <Badge variant="secondary">+2% vs yesterday</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Macro Bars */}
                  <div className="space-y-6 border-t border-border pt-8">
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
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Chart */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>Your calorie intake this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                      <YAxis stroke="var(--color-muted-foreground)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '12px',
                        }}
                        labelStyle={{ color: 'var(--color-foreground)' }}
                      />
                      <Bar dataKey="calories" fill="#7BAE7F" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="target" fill="#E8E6E1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stat Cards */}
            <motion.div variants={itemVariants}>
              <StatCard
                icon={Droplets}
                label="Water Intake"
                value="2.5"
                unit="/ 3L"
                change={12}
                color="blue"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                icon={Flame}
                label="Workout"
                value="45"
                unit="min"
                change={15}
                color="orange"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <StatCard
                icon={TrendingUp}
                label="Streak"
                value="15"
                unit="days"
                change={0}
                color="sage"
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full py-2 px-4 bg-sage/10 hover:bg-sage/20 text-sage rounded-lg font-medium transition-colors">
                    🤖 Generate Meal Plan
                  </button>
                  <button className="w-full py-2 px-4 bg-soft-orange/10 hover:bg-soft-orange/20 text-soft-orange rounded-lg font-medium transition-colors">
                    📋 Grocery List
                  </button>
                  <button className="w-full py-2 px-4 bg-sage/10 hover:bg-sage/20 text-sage rounded-lg font-medium transition-colors">
                    🎯 View Goals
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* AI Recommendations */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-soft-orange" />
                AI Meal Recommendations
              </CardTitle>
              <CardDescription>Based on your preferences and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {meals.map((meal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <NutritionCard {...meal} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Section */}
        <motion.div variants={itemVariants}>
          <Card className="gradient-sage">
            <CardContent className="pt-8 text-center">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Keep Going!</h3>
              <p className="text-muted-foreground mb-6">
                You're 78% done with today's calorie goal. Just {calorieData.goal - calorieData.consumed} calories left to reach your target!
              </p>
              <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Log a Meal
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

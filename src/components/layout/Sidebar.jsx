import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BookOpen, Activity, ShoppingCart, Users, Settings, LogOut, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Meal Planner', path: '/planner', icon: CalendarDays },
    { name: 'Recipes', path: '/recipes', icon: BookOpen },
    { name: 'Tracking', path: '/tracking', icon: Activity },
    { name: 'Groceries', path: '/groceries', icon: ShoppingCart },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:flex flex-col w-64 h-screen bg-card/60 backdrop-blur-xl border-r border-border fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-lg"
        >
          MM
        </motion.div>
        <span className="font-heading font-bold text-xl text-foreground">MealMaster</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group ${
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-highlight"
                    className="absolute inset-0 bg-sage/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-sage' : 'text-muted-foreground group-hover:text-sage'} transition-colors`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute right-0 w-1 h-8 bg-sage rounded-l-full"
                    layoutId="active-indicator"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border space-y-3">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sage/10 transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
        <div className="bg-sage/10 rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-foreground mb-2">Premium Access</p>
          <p className="text-xs text-muted-foreground mb-3">Unlock all features and personalized coaching</p>
          <button className="w-full bg-sage hover:bg-sage-dark text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

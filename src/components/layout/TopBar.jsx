import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react';

const TopBar = ({ onMenuClick }) => {
  const [isDark, setIsDark] = React.useState(false);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 w-full h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 mr-2 hover:bg-card rounded-lg text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-sage transition-colors" />
          <input
            type="text"
            placeholder="Search recipes, meals..."
            className="w-full bg-background border border-border rounded-full py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleThemeToggle}
          className="p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-card rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1 right-1 w-2 h-2 bg-soft-orange rounded-full"
          />
        </motion.button>

        {/* User Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 rounded-full bg-gradient-primary p-0.5 hover:shadow-lg transition-shadow"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gurpreet&backgroundColor=b6e3f4"
            alt="User profile"
            className="w-full h-full rounded-full"
          />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default TopBar;

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
  const variants = {
    default: 'bg-sage hover:bg-sage-dark text-white',
    secondary: 'bg-soft-orange hover:bg-orange-600 text-white',
    outline: 'border-2 border-sage text-sage hover:bg-sage/10',
    ghost: 'text-sage hover:bg-sage/10',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

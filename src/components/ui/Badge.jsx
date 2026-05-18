import React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-sage/20 text-sage border border-sage/30',
    secondary: 'bg-soft-orange/20 text-soft-orange border border-soft-orange/30',
    outline: 'border-2 border-sage text-sage',
    success: 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30',
  };

  return (
    <span
      className={cn(
        'px-3 py-1 rounded-full text-xs font-medium',
        'inline-flex items-center gap-1',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export const BadgeGroup = ({ children, className, ...props }) => (
  <div className={cn('flex flex-wrap gap-2', className)} {...props}>
    {children}
  </div>
);

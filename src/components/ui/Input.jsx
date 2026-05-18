import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'w-full px-4 py-3 rounded-xl',
      'bg-input border border-border',
      'text-foreground placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent',
      'transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full px-4 py-3 rounded-xl',
      'bg-input border border-border',
      'text-foreground placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent',
      'transition-all duration-200 resize-none',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

export const Label = ({ className, children, ...props }) => (
  <label
    className={cn(
      'block text-sm font-medium text-foreground mb-2',
      className
    )}
    {...props}
  >
    {children}
  </label>
);

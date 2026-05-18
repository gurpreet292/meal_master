import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Card = React.forwardRef(({ className, children, hover = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'bg-card border border-border rounded-2xl p-6',
      'soft-shadow',
      hover && 'card-hover',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn('text-2xl font-bold text-foreground', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn('text-muted-foreground text-sm mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('mt-6 flex gap-3', className)} {...props}>
    {children}
  </div>
);

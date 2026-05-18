import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

export const ProgressRing = ({ percentage = 65, size = 120, strokeWidth = 8, children, color = 'sage' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    sage: '#7BAE7F',
    orange: '#FFB86B',
    red: '#EF4444',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorMap[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-foreground"
            >
              {percentage}%
            </motion.div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export const MacroBar = ({ label, value, max, color = 'sage', unit = 'g' }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">
          {value}/{max}{unit}
        </span>
      </div>
      <div className="w-full h-3 bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full',
            color === 'sage' && 'bg-gradient-to-r from-sage to-sage-light',
            color === 'orange' && 'bg-gradient-to-r from-soft-orange to-orange-400',
            color === 'blue' && 'bg-gradient-to-r from-blue-500 to-blue-400'
          )}
        />
      </div>
    </div>
  );
};

export const StatCard = ({ icon: Icon, label, value, change, unit = '', color = 'sage' }) => (
  <Card className="relative overflow-hidden">
    <div className={cn('absolute inset-0 opacity-5', {
      'bg-gradient-to-br from-sage to-sage-light': color === 'sage',
      'bg-gradient-to-br from-soft-orange to-orange-400': color === 'orange',
      'bg-gradient-to-br from-blue-500 to-blue-400': color === 'blue',
    })} />
    <div className="relative space-y-3">
      <div className="flex items-start justify-between">
        <div className={cn(
          'p-2 rounded-lg',
          color === 'sage' && 'bg-sage/20 text-sage',
          color === 'orange' && 'bg-soft-orange/20 text-soft-orange',
          color === 'blue' && 'bg-blue-500/20 text-blue-500'
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <span className={cn(
            'text-xs font-semibold',
            change >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground">
          {value}<span className="text-sm ml-1 opacity-75">{unit}</span>
        </p>
      </div>
    </div>
  </Card>
);

export const NutritionCard = ({ name, calories, protein, carbs, fat, image, rating, time, onClick }) => (
  <motion.div whileHover={{ y: -6 }} onClick={onClick} className="cursor-pointer group">
    <Card className="overflow-hidden h-full rounded-3xl bg-cream shadow-lg">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-md border border-border bg-white">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🍽️</div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground leading-tight group-hover:text-sage transition-colors">
              {name}
            </h3>
            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-3">
              {time && <span className="inline-flex items-center gap-1">⏱️ {time}</span>}
              {rating && <span className="inline-flex items-center gap-1">⭐ {rating}</span>}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{calories}</div>
                <div className="text-xs text-muted-foreground">cal</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-soft-orange">{protein}g</div>
                <div className="text-xs text-muted-foreground">protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500">{carbs}g</div>
                <div className="text-xs text-muted-foreground">carbs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

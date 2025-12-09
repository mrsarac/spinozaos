'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Metric } from '@/lib/data';

interface MetricCardProps {
  metric: Metric;
  index: number;
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;

  const trendColors = {
    up: 'text-green-400 bg-green-500/10 border-green-500/30',
    down: 'text-red-400 bg-red-500/10 border-red-500/30',
    stable: 'text-neutral-400 bg-neutral-500/10 border-neutral-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ y: -2 }}
      className="
        group relative p-4 rounded-xl
        bg-void-lighter border border-white/5
        hover:border-spinoza-yellow/20 transition-colors
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          {metric.label}
        </span>
        <div
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
            border ${trendColors[metric.trend]}
          `}
        >
          <TrendIcon className="w-3 h-3" />
          <span>{metric.trendValue}</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className="text-3xl font-bold text-white font-mono tracking-tight">
          {metric.value}
        </span>
      </div>

      {/* Description */}
      {metric.description && (
        <p className="text-xs text-neutral-500">
          {metric.description}
        </p>
      )}

      {/* Hover glow */}
      <div
        className="
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-br from-spinoza-yellow/5 via-transparent to-transparent
        "
      />
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  Users,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { kpiMetrics, type KPIMetric } from '@/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
};

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiMetrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <KPICard metric={metric} />
        </motion.div>
      ))}
    </div>
  );
}

function KPICard({ metric }: { metric: KPIMetric }) {
  const sparklineData = metric.sparklineData.map((value, index) => ({
    value,
    index,
  }));

  const isPositive = metric.trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="analytics-card metric-glow group">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 bg-spinoza-yellow/10 rounded-lg text-spinoza-yellow">
            {iconMap[metric.icon]}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              isPositive
                ? 'bg-green-500/10 text-green-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            <TrendIcon className="w-3 h-3" />
            {Math.abs(metric.change)}%
          </div>
        </div>

        <div className="mb-1">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {metric.label}
          </p>
          <p className="text-2xl font-semibold text-white animate-count">
            {metric.value}
          </p>
        </div>

        {/* Sparkline */}
        <div className="h-10 mt-3 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#22c55e' : '#ef4444'}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#22c55e' : '#ef4444'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#22c55e' : '#ef4444'}
                strokeWidth={1.5}
                fill={`url(#gradient-${metric.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Activity, Wifi, Thermometer, Zap } from 'lucide-react';
import { systemMetrics, type SystemMetric } from '@/lib/data';

const metricIcons: Record<string, React.ReactNode> = {
  cpu: <Cpu className="w-4 h-4" />,
  memory: <HardDrive className="w-4 h-4" />,
  disk: <Activity className="w-4 h-4" />,
  network: <Wifi className="w-4 h-4" />,
  gpu: <Zap className="w-4 h-4" />,
  temp: <Thermometer className="w-4 h-4" />,
};

export function MetricsPanel() {
  const [metrics, setMetrics] = useState(systemMetrics);

  useEffect(() => {
    // Simulate metric updates
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const change = (Math.random() - 0.5) * 5;
          const newValue = Math.max(0, Math.min(metric.max, metric.value + change));
          const newStatus: SystemMetric['status'] =
            metric.id === 'temp'
              ? newValue > 80 ? 'critical' : newValue > 70 ? 'warning' : 'normal'
              : (newValue / metric.max) > 0.85 ? 'critical' : (newValue / metric.max) > 0.65 ? 'warning' : 'normal';

          return {
            ...metric,
            value: Math.round(newValue * 10) / 10,
            status: newStatus,
            trend: [...metric.trend.slice(1), newValue / metric.max * 100],
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {metrics.map((metric, index) => (
        <MetricCard key={metric.id} metric={metric} index={index} />
      ))}
    </div>
  );
}

function MetricCard({ metric, index }: { metric: SystemMetric; index: number }) {
  const percentage = (metric.value / metric.max) * 100;

  const statusColors = {
    normal: { bar: 'bg-green-500', text: 'text-green-400', glow: 'glow-green' },
    warning: { bar: 'bg-yellow-500', text: 'text-yellow-400', glow: 'glow-yellow' },
    critical: { bar: 'bg-red-500', text: 'text-red-400', glow: 'glow-red' },
  };

  const colors = statusColors[metric.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative p-3 rounded-lg bg-void-light/50 border border-white/5 overflow-hidden group hover:border-white/10 transition-colors"
    >
      {/* Background glow on critical */}
      {metric.status === 'critical' && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-2">
          <span className={colors.text}>{metricIcons[metric.id]}</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{metric.name}</span>
        </div>
        <span className={`text-[9px] px-1.5 py-0.5 rounded ${
          metric.status === 'normal' ? 'bg-green-500/20 text-green-400' :
          metric.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400 animate-pulse'
        }`}>
          {metric.status.toUpperCase()}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-2 relative">
        <span className={`text-2xl font-bold tabular-nums ${colors.text}`}>
          {metric.value}
        </span>
        <span className="text-sm text-neutral-500">{metric.unit}</span>
        <span className="text-[10px] text-neutral-600 ml-auto">/ {metric.max}{metric.unit}</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-void rounded-full overflow-hidden mb-2 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${colors.bar} relative`}
        >
          <div className="absolute inset-0 animate-shimmer" />
        </motion.div>
      </div>

      {/* Sparkline */}
      <div className="h-6 flex items-end gap-px">
        {metric.trend.map((value, i) => (
          <div
            key={i}
            className={`flex-1 ${colors.bar} opacity-40 rounded-t-sm transition-all duration-300`}
            style={{ height: `${Math.max(5, value)}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

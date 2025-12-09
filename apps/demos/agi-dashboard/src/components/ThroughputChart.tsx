'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { throughputData } from '@/lib/data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-void-light border border-white/10 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-neutral-400 mb-1">{label}</p>
      <p className="text-sm font-mono text-spinoza-yellow">
        {payload[0].value.toLocaleString()}/s
      </p>
    </div>
  );
}

export function ThroughputChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="p-5 rounded-xl bg-void-lighter border border-white/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Throughput</h3>
          <p className="text-xs text-neutral-500">Predictions per second</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-mono font-bold text-spinoza-yellow">12.4K</span>
          <span className="text-xs text-neutral-500 ml-1">/s avg</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={throughputData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(251, 191, 36, 0.05)' }} />
            <Bar
              dataKey="value"
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

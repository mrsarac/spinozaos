'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { performanceData } from '@/lib/data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-void-light border border-white/10 rounded-lg p-3 shadow-xl">
      <p className="text-xs text-neutral-400 mb-1">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-sm font-mono">
          <span className="text-spinoza-yellow">{item.value.toFixed(1)}%</span>
          <span className="text-neutral-500 ml-1">{item.name}</span>
        </p>
      ))}
    </div>
  );
}

export function PerformanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-5 rounded-xl bg-void-lighter border border-white/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Model Performance</h3>
          <p className="text-xs text-neutral-500">Prediction accuracy over time</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-spinoza-yellow rounded" />
            <span className="text-neutral-400">Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-neutral-500 rounded" />
            <span className="text-neutral-400">Baseline</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              domain={[85, 100]}
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#fbbf24"
              strokeWidth={2}
              fill="url(#accuracyGradient)"
              name="Accuracy"
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#64748b"
              strokeWidth={1}
              strokeDasharray="4 4"
              dot={false}
              name="Baseline"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { revenueData } from '@/lib/data';

type MetricType = 'revenue' | 'profit' | 'costs' | 'all';

const metrics: { id: MetricType; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: '' },
  { id: 'revenue', label: 'Revenue', color: '#fbbf24' },
  { id: 'profit', label: 'Profit', color: '#22c55e' },
  { id: 'costs', label: 'Costs', color: '#ef4444' },
];

export function RevenueChart() {
  const [activeMetric, setActiveMetric] = useState<MetricType>('all');

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Revenue Overview</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Monthly financial performance</p>
        </div>
        <div className="flex items-center gap-1 bg-void rounded-lg p-1">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setActiveMetric(metric.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeMetric === metric.id
                  ? 'bg-spinoza-yellow/20 text-spinoza-yellow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-72"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 11 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff', fontWeight: 500 }}
                itemStyle={{ color: '#a3a3a3' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              {(activeMetric === 'all' || activeMetric === 'revenue') && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
              )}
              {(activeMetric === 'all' || activeMetric === 'profit') && (
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#profitGradient)"
                  name="Profit"
                />
              )}
              {(activeMetric === 'all' || activeMetric === 'costs') && (
                <Area
                  type="monotone"
                  dataKey="costs"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#costsGradient)"
                  name="Costs"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

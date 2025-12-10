'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { engagementData } from '@/lib/data';

type MetricType = 'activeUsers' | 'sessions' | 'pageViews';

const metrics: { id: MetricType; label: string; color: string }[] = [
  { id: 'activeUsers', label: 'Active Users', color: '#fbbf24' },
  { id: 'sessions', label: 'Sessions', color: '#22c55e' },
  { id: 'pageViews', label: 'Page Views', color: '#3b82f6' },
];

export function EngagementChart() {
  const [activeMetrics, setActiveMetrics] = useState<MetricType[]>(['activeUsers', 'sessions']);

  const toggleMetric = (metric: MetricType) => {
    if (activeMetrics.includes(metric)) {
      if (activeMetrics.length > 1) {
        setActiveMetrics(activeMetrics.filter((m) => m !== metric));
      }
    } else {
      setActiveMetrics([...activeMetrics, metric]);
    }
  };

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">User Engagement</h3>
          <p className="text-xs text-neutral-500 mt-0.5">24-hour activity pattern</p>
        </div>
        <div className="flex items-center gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => toggleMetric(metric.id)}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors ${
                activeMetrics.includes(metric.id)
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: metric.color }}
              />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 10 }}
                interval={2}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff', fontWeight: 500 }}
              />
              {metrics
                .filter((m) => activeMetrics.includes(m.id))
                .map((metric) => (
                  <Line
                    key={metric.id}
                    type="monotone"
                    dataKey={metric.id}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                    name={metric.label}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

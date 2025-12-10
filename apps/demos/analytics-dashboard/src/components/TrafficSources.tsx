'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { trafficSources } from '@/lib/data';

export function TrafficSources() {
  const total = trafficSources.reduce((acc, source) => acc + source.value, 0);

  return (
    <div className="analytics-card h-full">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Traffic Sources</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Where visitors come from</p>
        </div>
      </div>

      <div className="p-4">
        {/* Donut Chart */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {trafficSources.map((source, index) => (
                  <Cell key={`cell-${index}`} fill={source.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff', fontWeight: 500 }}
                formatter={(value: number) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="relative -mt-[124px] flex flex-col items-center justify-center h-[100px] pointer-events-none">
            <p className="text-2xl font-bold text-white">{total}%</p>
            <p className="text-xs text-neutral-500">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 mt-8">
          {trafficSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-neutral-300">{source.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">{source.value}%</span>
                <div
                  className={`flex items-center gap-0.5 text-xs ${
                    source.growth >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {source.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(source.growth)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

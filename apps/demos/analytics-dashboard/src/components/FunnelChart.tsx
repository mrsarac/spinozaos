'use client';

import { motion } from 'framer-motion';
import { funnelData } from '@/lib/data';

export function FunnelChart() {
  return (
    <div className="analytics-card h-full">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Conversion Funnel</h3>
          <p className="text-xs text-neutral-500 mt-0.5">User journey analysis</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {funnelData.map((stage, index) => {
          const widthPercentage = stage.percentage;
          const colors = [
            'from-spinoza-yellow to-spinoza-gold',
            'from-green-500 to-green-600',
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
          ];

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-300">{stage.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">
                    {stage.value.toLocaleString()}
                  </span>
                  {stage.dropoff > 0 && (
                    <span className="text-xs text-red-400">
                      -{stage.dropoff}%
                    </span>
                  )}
                </div>
              </div>

              <div className="relative h-8 bg-void rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colors[index % colors.length]} rounded-lg`}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <span className="text-xs font-mono text-white/80">
                    {stage.percentage}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Conversion rate summary */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Overall Conversion</span>
            <span className="text-lg font-semibold text-spinoza-yellow">
              {funnelData[funnelData.length - 1].percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

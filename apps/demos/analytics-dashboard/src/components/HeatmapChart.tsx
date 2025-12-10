'use client';

import { motion } from 'framer-motion';
import { heatmapData } from '@/lib/data';

export function HeatmapChart() {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0') + ':00'
  );

  // Get color based on value (0-100)
  const getColor = (value: number): string => {
    if (value < 20) return 'bg-void-lighter';
    if (value < 40) return 'bg-spinoza-yellow/20';
    if (value < 60) return 'bg-spinoza-yellow/40';
    if (value < 80) return 'bg-spinoza-yellow/60';
    return 'bg-spinoza-yellow/80';
  };

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Activity Heatmap</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Hourly engagement patterns</p>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex mb-2">
            <div className="w-12" />
            {hours.map((hour, i) =>
              i % 3 === 0 ? (
                <div
                  key={hour}
                  className="flex-1 text-center text-[10px] text-neutral-500"
                >
                  {hour}
                </div>
              ) : (
                <div key={hour} className="flex-1" />
              )
            )}
          </div>

          {/* Heatmap rows */}
          <div className="space-y-1">
            {heatmapData.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
                className="flex items-center gap-1"
              >
                <div className="w-10 text-xs text-neutral-500 font-medium">
                  {day.day}
                </div>
                {day.hours.map((value, hourIndex) => (
                  <motion.div
                    key={`${day.day}-${hourIndex}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (dayIndex * 24 + hourIndex) * 0.002 }}
                    className={`flex-1 h-6 ${getColor(value)} heatmap-cell group relative`}
                    title={`${day.day} ${hours[hourIndex]}: ${value}% activity`}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-void-lighter border border-white/10 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {value}%
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-4 mt-4">
            <span className="text-[10px] text-neutral-500">Less</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-void-lighter" />
              <div className="w-4 h-4 rounded bg-spinoza-yellow/20" />
              <div className="w-4 h-4 rounded bg-spinoza-yellow/40" />
              <div className="w-4 h-4 rounded bg-spinoza-yellow/60" />
              <div className="w-4 h-4 rounded bg-spinoza-yellow/80" />
            </div>
            <span className="text-[10px] text-neutral-500">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

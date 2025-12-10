'use client';

import { motion } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { geoData } from '@/lib/data';

// Flag emojis based on country code
const getFlag = (code: string): string => {
  const flags: Record<string, string> = {
    US: '\ud83c\uddfa\ud83c\uddf8',
    DE: '\ud83c\udde9\ud83c\uddea',
    GB: '\ud83c\uddec\ud83c\udde7',
    FR: '\ud83c\uddeb\ud83c\uddf7',
    JP: '\ud83c\uddef\ud83c\uddf5',
    CA: '\ud83c\udde8\ud83c\udde6',
  };
  return flags[code] || '\ud83c\udff3\ufe0f';
};

export function GeoMap() {
  const maxUsers = Math.max(...geoData.map((g) => g.users));

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Geographic Distribution</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Users by country</p>
        </div>
        <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <MapPin className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {geoData.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="geo-row"
            >
              {/* Flag and country */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <span className="text-xl">{getFlag(country.code)}</span>
                <div>
                  <p className="text-sm font-medium text-white">{country.country}</p>
                  <p className="text-xs text-neutral-500">{country.code}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex-1 mx-4">
                <div className="relative h-2 bg-void rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(country.users / maxUsers) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-spinoza-yellow to-spinoza-gold rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-right">
                <div>
                  <p className="text-sm font-medium text-white">
                    {country.users.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500">users</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    ${(country.revenue / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-neutral-500">revenue</p>
                </div>
                <div
                  className={`flex items-center gap-0.5 ${
                    country.growth >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {country.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium">{country.growth}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

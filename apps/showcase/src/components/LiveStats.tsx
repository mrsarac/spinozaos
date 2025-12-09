'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Zap, Eye, TrendingUp } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
}

const initialStats: Stat[] = [
  { id: 'users', label: 'Active Developers', value: 1247, icon: <Users className="w-4 h-4" />, color: 'text-green-400' },
  { id: 'components', label: 'Components Used', value: 25, icon: <Zap className="w-4 h-4" />, color: 'text-spinoza-yellow' },
  { id: 'views', label: 'Page Views', value: 48293, suffix: '', icon: <Eye className="w-4 h-4" />, color: 'text-blue-400' },
  { id: 'installs', label: 'npm Installs', value: 3842, icon: <TrendingUp className="w-4 h-4" />, color: 'text-purple-400' },
];

export function LiveStats() {
  const [stats, setStats] = useState(initialStats);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 5) - 1,
        }))
      );
      setLastUpdated('now');

      // Reset "now" to actual time after a moment
      setTimeout(() => {
        const now = new Date();
        setLastUpdated(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
      }, 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="flex items-center gap-3"
        >
          <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-xl font-bold font-mono text-white"
              >
                {stat.value.toLocaleString()}{stat.suffix}
              </motion.div>
            </AnimatePresence>
            <div className="text-xs text-neutral-500">{stat.label}</div>
          </div>
        </motion.div>
      ))}

      {/* Live indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs text-green-400 font-medium">LIVE</span>
      </motion.div>
    </div>
  );
}

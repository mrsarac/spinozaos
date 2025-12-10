'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ShoppingCart, ArrowUpCircle, XCircle, DollarSign } from 'lucide-react';
import { recentActivity, type ActivityItem } from '@/lib/data';

const typeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  signup: {
    icon: <UserPlus className="w-4 h-4" />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  purchase: {
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
  },
  upgrade: {
    icon: <ArrowUpCircle className="w-4 h-4" />,
    color: 'text-spinoza-yellow',
    bg: 'bg-spinoza-yellow/20',
  },
  churn: {
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
  },
};

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState(recentActivity);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['signup', 'purchase', 'upgrade'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      const companies = ['DataCorp', 'TechStart', 'CloudFirst', 'AI Labs', 'DevOps Inc'];
      const products = ['Enterprise Plan', 'API Credits', 'Professional Plan'];

      const newActivity: ActivityItem = {
        id: `activity-${Date.now()}`,
        type,
        user: companies[Math.floor(Math.random() * companies.length)],
        details:
          type === 'signup'
            ? 'New account created'
            : type === 'purchase'
              ? products[Math.floor(Math.random() * products.length)]
              : 'Plan upgraded',
        amount: type !== 'signup' ? Math.floor(Math.random() * 10000) + 1000 : undefined,
        timestamp: new Date(),
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 7)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="analytics-card h-full">
      <div className="analytics-card-header">
        <div>
          <h3 className="text-sm font-semibold text-white">Live Activity</h3>
          <p className="text-xs text-neutral-500 mt-0.5">Real-time events</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 live-indicator" />
          <span className="text-xs text-neutral-500">Live</span>
        </div>
      </div>

      <div className="p-2 max-h-[400px] overflow-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => {
            const config = typeConfig[activity.type];
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                layout
                className="activity-item"
              >
                <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">
                      {activity.user}
                    </p>
                    {activity.amount && (
                      <span className="flex items-center gap-0.5 text-xs text-green-400">
                        <DollarSign className="w-3 h-3" />
                        {activity.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{activity.details}</p>
                </div>
                <span className="text-[10px] text-neutral-600 whitespace-nowrap">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

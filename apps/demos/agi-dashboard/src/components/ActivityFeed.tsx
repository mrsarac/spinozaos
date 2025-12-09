'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { activities, type ActivityItem } from '@/lib/data';

const activityIcons = {
  prediction: Zap,
  alert: AlertTriangle,
  update: Info,
  milestone: CheckCircle,
};

const severityColors = {
  info: 'text-blue-400 bg-blue-500/10',
  warning: 'text-yellow-400 bg-yellow-500/10',
  critical: 'text-red-400 bg-red-500/10',
};

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="p-5 rounded-xl bg-void-lighter border border-white/5 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Activity Feed</h3>
          <p className="text-xs text-neutral-500">Real-time system events</p>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-400 font-medium">LIVE</span>
        </span>
      </div>

      {/* Activity list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => (
          <ActivityRow key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function ActivityRow({ activity, index }: { activity: ActivityItem; index: number }) {
  const Icon = activityIcons[activity.type];
  const severityClass = activity.severity ? severityColors[activity.severity] : 'text-neutral-400 bg-neutral-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 + 0.5 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-void-light/50 hover:bg-void-light transition-colors"
    >
      <div className={`p-1.5 rounded ${severityClass}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-200 line-clamp-2">{activity.message}</p>
        <span className="text-xs text-neutral-500">{activity.timestamp}</span>
      </div>
    </motion.div>
  );
}

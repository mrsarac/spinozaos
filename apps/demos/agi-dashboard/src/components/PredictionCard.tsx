'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import type { Prediction } from '@/lib/data';

interface PredictionCardProps {
  prediction: Prediction;
  index: number;
}

const clearanceColors = {
  cosmic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  topSecret: 'bg-red-500/20 text-red-400 border-red-500/30',
  secret: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  classified: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  standard: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const statusIcons = {
  active: Activity,
  pending: Clock,
  completed: CheckCircle,
};

export function PredictionCard({ prediction, index }: PredictionCardProps) {
  const StatusIcon = statusIcons[prediction.status];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-spinoza-yellow';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
      className="
        group p-4 rounded-lg
        bg-void-light/50 border border-white/5
        hover:border-spinoza-yellow/20 hover:bg-void-light
        transition-all cursor-pointer
      "
    >
      <div className="flex items-start justify-between mb-3">
        {/* Title & Category */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate group-hover:text-spinoza-yellow transition-colors">
            {prediction.title}
          </h4>
          <span className="text-xs text-neutral-500">{prediction.category}</span>
        </div>

        {/* Clearance Badge */}
        <span
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase
            border ${clearanceColors[prediction.clearance]}
          `}
        >
          <Shield className="w-3 h-3" />
          {prediction.clearance}
        </span>
      </div>

      {/* Confidence Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-neutral-400">Confidence</span>
          <span className="text-xs font-mono text-white">{prediction.confidence}%</span>
        </div>
        <div className="h-1.5 bg-void rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${prediction.confidence}%` }}
            transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${getConfidenceColor(prediction.confidence)}`}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Clock className="w-3 h-3" />
          <span>{prediction.timestamp}</span>
        </div>

        <div
          className={`
            flex items-center gap-1 px-2 py-0.5 rounded text-xs
            ${prediction.status === 'active'
              ? 'bg-green-500/10 text-green-400'
              : prediction.status === 'pending'
                ? 'bg-yellow-500/10 text-yellow-400'
                : 'bg-neutral-500/10 text-neutral-400'
            }
          `}
        >
          <StatusIcon className="w-3 h-3" />
          <span className="capitalize">{prediction.status}</span>
        </div>
      </div>
    </motion.div>
  );
}

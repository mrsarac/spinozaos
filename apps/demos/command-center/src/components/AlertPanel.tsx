'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, X, Clock } from 'lucide-react';
import { alerts, type Alert } from '@/lib/data';

const severityConfig: Record<string, { icon: React.ReactNode; color: string; bg: string; border: string; pulse?: boolean }> = {
  low: { icon: <Info className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  medium: { icon: <AlertCircle className="w-4 h-4" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  high: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  critical: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', pulse: true },
};

export function AlertPanel() {
  const [alertList, setAlertList] = useState(alerts);
  const activeAlerts = alertList.filter((a) => !a.acknowledged);

  const acknowledgeAlert = (id: string) => {
    setAlertList((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const dismissAlert = (id: string) => {
    setAlertList((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-void-light/30 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Bell className={`w-4 h-4 ${activeAlerts.length > 0 ? 'text-red-400 animate-pulse' : 'text-spinoza-yellow'}`} />
          <span className="text-sm font-medium text-white">Alerts</span>
          {activeAlerts.length > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              {activeAlerts.length} active
            </span>
          )}
        </div>
        <button className="text-[9px] text-neutral-500 hover:text-white transition-colors">
          Clear All
        </button>
      </div>

      {/* Alerts list */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          {alertList.map((alert, index) => (
            <AlertRow
              key={alert.id}
              alert={alert}
              index={index}
              onAcknowledge={() => acknowledgeAlert(alert.id)}
              onDismiss={() => dismissAlert(alert.id)}
            />
          ))}
        </AnimatePresence>

        {alertList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
            <span className="text-sm text-neutral-400">All clear!</span>
            <span className="text-[10px] text-neutral-600">No active alerts</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AlertRow({
  alert,
  index,
  onAcknowledge,
  onDismiss,
}: {
  alert: Alert;
  index: number;
  onAcknowledge: () => void;
  onDismiss: () => void;
}) {
  const config = severityConfig[alert.severity];
  const timeAgo = getTimeAgo(alert.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`relative p-3 border-b border-white/5 ${config.bg} ${alert.acknowledged ? 'opacity-50' : ''}`}
    >
      {/* Critical pulse effect */}
      {config.pulse && !alert.acknowledged && (
        <motion.div
          animate={{ opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-500/10"
        />
      )}

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <span className={config.color}>{config.icon}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-white">{alert.title}</span>
            <span className={`text-[8px] px-1.5 py-0.5 rounded ${config.bg} ${config.color} border ${config.border} uppercase`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-[10px] text-neutral-400 mb-2">{alert.message}</p>
          <div className="flex items-center gap-3 text-[9px] text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {timeAgo}
            </span>
            <span className="text-cyan-400">{alert.service}</span>
            {alert.acknowledged && (
              <span className="text-green-400">Acknowledged</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {!alert.acknowledged && (
            <button
              onClick={onAcknowledge}
              className="p-1 text-neutral-500 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors"
              title="Acknowledge"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onDismiss}
            className="p-1 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

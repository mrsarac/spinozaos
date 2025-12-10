'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Download,
  RefreshCw,
  Calendar,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { dateRanges } from '@/lib/data';

interface HeaderProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function Header({ selectedRange, onRangeChange, onRefresh, isRefreshing }: HeaderProps) {
  const [showRangeMenu, setShowRangeMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-void/90 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-spinoza-yellow/20 border border-spinoza-yellow/50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-spinoza-yellow" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Analytics</h1>
              <p className="text-xs text-neutral-500">Real-time business intelligence</p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 live-indicator" />
            <span className="text-xs font-medium text-green-400">Live</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div className="relative">
            <button
              onClick={() => setShowRangeMenu(!showRangeMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-void-lighter border border-white/10 rounded-lg text-sm text-white hover:border-white/20 transition-colors"
            >
              <Calendar className="w-4 h-4 text-neutral-400" />
              {dateRanges.find((r) => r.id === selectedRange)?.label}
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            {showRangeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-void-lighter border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
              >
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      onRangeChange(range.id);
                      setShowRangeMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                      selectedRange === range.id
                        ? 'bg-spinoza-yellow/10 text-spinoza-yellow'
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Refresh button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 bg-void-lighter border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>

          {/* Export button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-void-lighter border border-white/10 rounded-lg text-sm text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>

          {/* Notifications */}
          <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

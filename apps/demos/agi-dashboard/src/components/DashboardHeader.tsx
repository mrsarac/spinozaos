'use client';

import { motion } from 'framer-motion';
import { Activity, Bell, Settings, ExternalLink } from 'lucide-react';

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border-b border-white/5 sticky top-0 z-50"
    >
      <div className="max-w-[1800px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-spinoza-yellow/10 border border-spinoza-yellow/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-spinoza-yellow" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">AGI Dashboard</h1>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                Prediction Engine
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">System Online</span>
          </div>
        </div>

        {/* Center: Time periods */}
        <div className="hidden lg:flex items-center gap-1">
          {['24h', '7d', '30d', '1y', 'All'].map((period, i) => (
            <button
              key={period}
              className={`
                px-3 py-1.5 text-xs font-medium rounded transition-colors
                ${i === 0
                  ? 'bg-spinoza-yellow/10 text-spinoza-yellow border border-spinoza-yellow/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <span className="hidden md:block text-xs text-neutral-500 font-mono">
            Last update: 3s ago
          </span>

          <button className="relative p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-spinoza-yellow rounded-full" />
          </button>

          <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          <a
            href="https://github.com/mrsarac/spinozaos"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden md:flex items-center gap-1.5 px-3 py-1.5
              text-xs text-neutral-400 hover:text-spinoza-yellow
              bg-void-lighter rounded border border-white/10
              hover:border-spinoza-yellow/30 transition-colors
            "
          >
            <span>SpinozaOS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

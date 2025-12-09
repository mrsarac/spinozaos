'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, Clock, TrendingUp, Shield, Zap } from 'lucide-react';

export function Header() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-10 bg-void-light/80 border-b border-white/5 flex items-center justify-between px-4">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-spinoza-yellow/20 border border-spinoza-yellow/50 flex items-center justify-center">
            <span className="text-spinoza-yellow text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-semibold text-white">
            SPINOZA<span className="text-spinoza-yellow">MARKETS</span>
          </span>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
          AGI Prediction Terminal
        </span>
      </div>

      {/* Center - Status indicators */}
      <div className="flex items-center gap-6">
        <StatusIndicator icon={<Wifi className="w-3 h-3" />} label="FEED" status="connected" />
        <StatusIndicator icon={<Activity className="w-3 h-3" />} label="API" status="connected" />
        <StatusIndicator icon={<Shield className="w-3 h-3" />} label="SECURE" status="connected" />
        <StatusIndicator icon={<Zap className="w-3 h-3" />} label="LATENCY" value="12ms" />
      </div>

      {/* Right - Time & Date */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[11px]">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-green-400">MARKETS OPEN</span>
        </div>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-neutral-500" />
          <span className="text-[11px] text-neutral-400 tabular-nums">{date}</span>
          <span className="text-[11px] text-spinoza-yellow tabular-nums font-semibold">{time}</span>
        </div>
      </div>
    </header>
  );
}

function StatusIndicator({
  icon,
  label,
  status,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  status?: 'connected' | 'disconnected' | 'warning';
  value?: string;
}) {
  const statusColors = {
    connected: 'text-green-400',
    disconnected: 'text-red-400',
    warning: 'text-yellow-400',
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className={status ? statusColors[status] : 'text-neutral-400'}>{icon}</span>
      <span className="text-[10px] text-neutral-500 uppercase">{label}</span>
      {status === 'connected' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
        </span>
      )}
      {value && <span className="text-[10px] text-cyan-400 tabular-nums">{value}</span>}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Wifi, Server, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export function Header() {
  const [time, setTime] = useState<string>('');
  const [uptime, setUptime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulated uptime
    const startTime = Date.now() - 15 * 24 * 60 * 60 * 1000; // 15 days ago
    const updateUptime = () => {
      const diff = Date.now() - startTime;
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      setUptime(`${days}d ${hours}h ${minutes}m`);
    };
    updateUptime();
    const interval = setInterval(updateUptime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-9 bg-void border-b border-white/5 flex items-center justify-between px-4 text-[10px]">
      {/* Left - System ID */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-spinoza-yellow/20 border border-spinoza-yellow/50 flex items-center justify-center">
            <span className="text-spinoza-yellow text-[9px] font-bold">S</span>
          </div>
          <span className="text-neutral-300 font-medium">SPINOZA<span className="text-spinoza-yellow">OS</span></span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-500">COMMAND CENTER</span>
        </div>

        <div className="flex items-center gap-3 text-neutral-500">
          <span>NODE: <span className="text-cyan-400">spinoza-prod-01</span></span>
          <span>REGION: <span className="text-neutral-300">us-east-1</span></span>
        </div>
      </div>

      {/* Center - Quick status */}
      <div className="flex items-center gap-4">
        <StatusPill icon={<Server className="w-3 h-3" />} label="SERVICES" value="7/8" status="warning" />
        <StatusPill icon={<Shield className="w-3 h-3" />} label="SECURITY" value="OK" status="success" />
        <StatusPill icon={<Wifi className="w-3 h-3" />} label="NETWORK" value="156Mbps" status="success" />
        <StatusPill icon={<AlertTriangle className="w-3 h-3" />} label="ALERTS" value="3" status="warning" />
      </div>

      {/* Right - Time & Uptime */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-neutral-500">
          <span>UPTIME:</span>
          <span className="text-green-400 tabular-nums">{uptime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-neutral-500" />
          <span className="text-spinoza-yellow tabular-nums font-medium">{time}</span>
          <span className="text-neutral-600">UTC</span>
        </div>
      </div>
    </header>
  );
}

function StatusPill({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error';
}) {
  const statusColors = {
    success: 'text-green-400 bg-green-500/10 border-green-500/30',
    warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    error: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${statusColors[status]}`}>
      {icon}
      <span className="text-neutral-500">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

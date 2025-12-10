'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, MemoryStick, Clock, User, MoreVertical, Play, Square, RefreshCw } from 'lucide-react';
import { processes, type Process } from '@/lib/data';

export function ProcessList() {
  const [processList, setProcessList] = useState(processes);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessList((prev) =>
        prev.map((p) => ({
          ...p,
          cpu: Math.max(0, Math.min(100, p.cpu + (Math.random() - 0.5) * 5)),
          memory: Math.max(64, p.memory + Math.floor((Math.random() - 0.5) * 50)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalCpu = processList.reduce((sum, p) => sum + p.cpu, 0);
  const totalMemory = processList.reduce((sum, p) => sum + p.memory, 0);

  return (
    <div className="h-full flex flex-col bg-void-light/30 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Processes</span>
          <span className="text-[10px] text-neutral-500">({processList.length})</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-neutral-500">
          <span>CPU: <span className="text-spinoza-yellow tabular-nums">{totalCpu.toFixed(1)}%</span></span>
          <span>MEM: <span className="text-cyan-400 tabular-nums">{(totalMemory / 1024).toFixed(1)}GB</span></span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[8px] text-neutral-600 uppercase tracking-wider border-b border-white/5 bg-void/50">
        <span className="col-span-3">Process</span>
        <span className="col-span-1 text-right">PID</span>
        <span className="col-span-2 text-right">CPU</span>
        <span className="col-span-2 text-right">Memory</span>
        <span className="col-span-2">User</span>
        <span className="col-span-1">Status</span>
        <span className="col-span-1"></span>
      </div>

      {/* Process list */}
      <div className="flex-1 overflow-auto">
        {processList.map((process, index) => (
          <ProcessRow key={process.id} process={process} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProcessRow({ process, index }: { process: Process; index: number }) {
  const [showMenu, setShowMenu] = useState(false);

  const statusConfig = {
    running: { color: 'text-green-400', bg: 'bg-green-500' },
    sleeping: { color: 'text-blue-400', bg: 'bg-blue-500' },
    stopped: { color: 'text-red-400', bg: 'bg-red-500' },
  };

  const config = statusConfig[process.status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="grid grid-cols-12 gap-2 px-3 py-2 text-[10px] border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
    >
      {/* Process name */}
      <div className="col-span-3 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${config.bg}`} />
        <span className="text-white font-medium truncate">{process.name}</span>
      </div>

      {/* PID */}
      <span className="col-span-1 text-right text-neutral-500 tabular-nums">{process.pid}</span>

      {/* CPU */}
      <div className="col-span-2 flex items-center justify-end gap-1">
        <div className="w-12 h-1 bg-void rounded-full overflow-hidden">
          <div
            className={`h-full ${process.cpu > 50 ? 'bg-yellow-500' : 'bg-green-500'} transition-all duration-500`}
            style={{ width: `${process.cpu}%` }}
          />
        </div>
        <span className={`tabular-nums ${process.cpu > 50 ? 'text-yellow-400' : 'text-neutral-400'}`}>
          {process.cpu.toFixed(1)}%
        </span>
      </div>

      {/* Memory */}
      <div className="col-span-2 flex items-center justify-end gap-1">
        <MemoryStick className="w-3 h-3 text-neutral-600" />
        <span className="text-cyan-400 tabular-nums">
          {process.memory >= 1024 ? `${(process.memory / 1024).toFixed(1)}GB` : `${process.memory}MB`}
        </span>
      </div>

      {/* User */}
      <div className="col-span-2 flex items-center gap-1">
        <User className="w-3 h-3 text-neutral-600" />
        <span className="text-neutral-400">{process.user}</span>
      </div>

      {/* Status */}
      <span className={`col-span-1 ${config.color} capitalize`}>{process.status}</span>

      {/* Actions */}
      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          <MoreVertical className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

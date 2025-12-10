'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Filter, Pause, Play, Search, ChevronDown } from 'lucide-react';
import { generateLogs, type LogEntry } from '@/lib/data';

const logLevelConfig = {
  info: { color: 'text-blue-400', bg: 'bg-blue-500/20' },
  warn: { color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  error: { color: 'text-red-400', bg: 'bg-red-500/20' },
  debug: { color: 'text-purple-400', bg: 'bg-purple-500/20' },
  trace: { color: 'text-neutral-500', bg: 'bg-neutral-500/20' },
};

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [newLogId, setNewLogId] = useState<string | null>(null);

  useEffect(() => {
    setLogs(generateLogs(30));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date(),
        level: ['info', 'warn', 'error', 'debug', 'trace'][Math.floor(Math.random() * 5)] as LogEntry['level'],
        service: ['api-gateway', 'auth-service', 'inference-engine', 'cache-layer', 'data-pipeline'][Math.floor(Math.random() * 5)],
        message: [
          'Request processed successfully',
          'Cache hit for session data',
          'High latency detected',
          'Connection timeout',
          'Health check passed',
          'Token validation completed',
          'Batch processing started',
        ][Math.floor(Math.random() * 7)],
      };

      setNewLogId(newLog.id);
      setLogs((prev) => [newLog, ...prev.slice(0, 99)]);

      setTimeout(() => setNewLogId(null), 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredLogs = logs.filter((log) => {
    if (filter !== 'all' && log.level !== filter) return false;
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.service.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-void rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-void-light/50">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Log Stream</span>
          <span className="text-[10px] text-neutral-500">({filteredLogs.length} entries)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-void rounded border border-white/10">
            <Search className="w-3 h-3 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter logs..."
              className="bg-transparent text-[10px] text-white outline-none w-24 placeholder-neutral-600"
            />
          </div>

          {/* Level filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 bg-void text-[10px] text-white rounded border border-white/10 outline-none"
          >
            <option value="all">ALL</option>
            <option value="error">ERROR</option>
            <option value="warn">WARN</option>
            <option value="info">INFO</option>
            <option value="debug">DEBUG</option>
            <option value="trace">TRACE</option>
          </select>

          {/* Pause/Play */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-1.5 rounded transition-colors ${
              isPaused ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Logs */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          {filteredLogs.map((log) => (
            <LogRow key={log.id} log={log} isNew={log.id === newLogId} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LogRow({ log, isNew }: { log: LogEntry; isNew: boolean }) {
  const config = logLevelConfig[log.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
      animate={{ opacity: 1, y: 0, backgroundColor: isNew ? 'rgba(251, 191, 36, 0.05)' : 'transparent' }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-2 px-3 py-1.5 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors text-[10px] font-mono"
    >
      {/* Timestamp */}
      <span className="text-neutral-600 tabular-nums whitespace-nowrap">
        {log.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        <span className="text-neutral-700">.{log.timestamp.getMilliseconds().toString().padStart(3, '0')}</span>
      </span>

      {/* Level */}
      <span className={`px-1.5 py-0.5 rounded ${config.bg} ${config.color} uppercase text-[8px] font-medium`}>
        {log.level.padEnd(5)}
      </span>

      {/* Service */}
      <span className="text-cyan-400 whitespace-nowrap">
        [{log.service}]
      </span>

      {/* Message */}
      <span className="text-neutral-300 flex-1 truncate">{log.message}</span>

      {/* Metadata */}
      {log.metadata && (
        <span className="text-neutral-600">
          {JSON.stringify(log.metadata)}
        </span>
      )}
    </motion.div>
  );
}

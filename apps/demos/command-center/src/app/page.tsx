'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MetricsPanel } from '@/components/MetricsPanel';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LogViewer } from '@/components/LogViewer';
import { AlertPanel } from '@/components/AlertPanel';
import { ProcessList } from '@/components/ProcessList';

export default function CommandCenter() {
  return (
    <div className="h-screen flex flex-col bg-void overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Alerts */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72 border-r border-white/5 flex flex-col"
        >
          <AlertPanel />
        </motion.aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col overflow-hidden p-2 gap-2">
          {/* Top row - Metrics */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MetricsPanel />
          </motion.div>

          {/* Middle row - Services and Processes */}
          <div className="flex gap-2 h-[40%]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <ServiceGrid />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1"
            >
              <ProcessList />
            </motion.div>
          </div>

          {/* Bottom row - Log Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
            <LogViewer />
          </motion.div>
        </main>
      </div>

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-scan" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 grid-dots opacity-30" />

      {/* Corner decorations */}
      <div className="fixed top-9 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-4 left-4 w-6 h-px bg-gradient-to-r from-spinoza-yellow/50 to-transparent" />
        <div className="absolute top-4 left-4 w-px h-6 bg-gradient-to-b from-spinoza-yellow/50 to-transparent" />
      </div>
      <div className="fixed top-9 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-4 right-4 w-6 h-px bg-gradient-to-l from-spinoza-yellow/50 to-transparent" />
        <div className="absolute top-4 right-4 w-px h-6 bg-gradient-to-b from-spinoza-yellow/50 to-transparent" />
      </div>
      <div className="fixed bottom-0 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-4 left-4 w-6 h-px bg-gradient-to-r from-green-500/50 to-transparent" />
        <div className="absolute bottom-4 left-4 w-px h-6 bg-gradient-to-t from-green-500/50 to-transparent" />
      </div>
      <div className="fixed bottom-0 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-6 h-px bg-gradient-to-l from-green-500/50 to-transparent" />
        <div className="absolute bottom-4 right-4 w-px h-6 bg-gradient-to-t from-green-500/50 to-transparent" />
      </div>

      {/* System status footer */}
      <div className="h-5 bg-void border-t border-white/5 flex items-center justify-between px-4 text-[8px] text-neutral-600">
        <div className="flex items-center gap-4">
          <span>SYS: <span className="text-green-400">NOMINAL</span></span>
          <span>NET: <span className="text-green-400">CONNECTED</span></span>
          <span>SEC: <span className="text-green-400">LEVEL-5</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>SPINOZA COMMAND CENTER v1.0.0</span>
          <span className="text-spinoza-yellow">MORE GEOMETRICO</span>
        </div>
      </div>
    </div>
  );
}

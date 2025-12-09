'use client';

import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricCard } from '@/components/MetricCard';
import { PredictionCard } from '@/components/PredictionCard';
import { PerformanceChart } from '@/components/PerformanceChart';
import { ThroughputChart } from '@/components/ThroughputChart';
import { ActivityFeed } from '@/components/ActivityFeed';
import { metrics, predictions } from '@/lib/data';

export default function AGIDashboard() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="max-w-[1800px] mx-auto p-6">
        {/* Metrics Row */}
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <PerformanceChart />
            <ThroughputChart />
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6">
            <ActivityFeed />
          </div>
        </div>

        {/* Predictions Section */}
        <section className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-5 rounded-xl bg-void-lighter border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-white">Active Predictions</h3>
                <p className="text-xs text-neutral-500">Real-time model outputs</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">
                  {predictions.filter((p) => p.status === 'active').length} active
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="text-xs text-neutral-400">
                  {predictions.length} total
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {predictions.map((prediction, index) => (
                <PredictionCard key={prediction.id} prediction={prediction} index={index} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-spinoza-yellow font-serif">SpinozaOS</span>
              <span>AGI Dashboard Demo</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Built with SpinozaOS v1.0.0</span>
              <a
                href="https://github.com/mrsarac/spinozaos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-spinoza-yellow transition-colors"
              >
                View Source
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

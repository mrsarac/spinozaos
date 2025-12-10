'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/KPICards';
import { RevenueChart } from '@/components/RevenueChart';
import { TrafficSources } from '@/components/TrafficSources';
import { FunnelChart } from '@/components/FunnelChart';
import { GeoMap } from '@/components/GeoMap';
import { ActivityFeed } from '@/components/ActivityFeed';
import { HeatmapChart } from '@/components/HeatmapChart';
import { ProductTable } from '@/components/ProductTable';
import { EngagementChart } from '@/components/EngagementChart';

export default function AnalyticsDashboard() {
  const [selectedRange, setSelectedRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-void">
      <Header
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <main className="p-6 space-y-6">
        {/* Last update indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-neutral-500 text-right"
        >
          Last updated: {lastUpdate.toLocaleTimeString()}
        </motion.div>

        {/* KPI Cards */}
        <section>
          <KPICards />
        </section>

        {/* Revenue and Traffic Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <TrafficSources />
          </div>
        </section>

        {/* Engagement and Heatmap */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EngagementChart />
          <HeatmapChart />
        </section>

        {/* Funnel and Geographic */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelChart />
          <GeoMap />
        </section>

        {/* Product Table and Activity Feed */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductTable />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-4">
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <p>Analytics Dashboard - SpinozaOS Demo</p>
          <p>Data is simulated for demonstration purposes</p>
        </div>
      </footer>
    </div>
  );
}

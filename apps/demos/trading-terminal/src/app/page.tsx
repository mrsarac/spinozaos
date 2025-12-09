'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { MarketTicker } from '@/components/MarketTicker';
import { MarketCard } from '@/components/MarketCard';
import { PriceChart } from '@/components/PriceChart';
import { OrderBook } from '@/components/OrderBook';
import { TradeHistory } from '@/components/TradeHistory';
import { NewsFeed } from '@/components/NewsFeed';
import { TerminalPanel } from '@/components/TerminalPanel';
import { predictionMarkets } from '@/lib/data';

export default function TradingTerminal() {
  const [selectedMarket, setSelectedMarket] = useState(predictionMarkets[0]);

  return (
    <div className="h-screen flex flex-col bg-void overflow-hidden">
      {/* Top header */}
      <Header />

      {/* Market ticker */}
      <MarketTicker />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main trading area */}
        <main className="flex-1 flex flex-col overflow-hidden p-2 gap-2">
          {/* Top row - Markets grid and Chart */}
          <div className="flex gap-2 h-[55%]">
            {/* Markets panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 flex flex-col bg-void-light/30 rounded-lg border border-white/5 overflow-hidden"
            >
              <div className="p-3 border-b border-white/5">
                <h2 className="text-sm font-medium text-white">AGI Prediction Markets</h2>
                <p className="text-[10px] text-neutral-500 mt-0.5">Trade on superintelligence timelines</p>
              </div>
              <div className="flex-1 overflow-auto p-2 space-y-2">
                {predictionMarkets.slice(0, 6).map((market, index) => (
                  <MarketCard
                    key={market.id}
                    market={market}
                    index={index}
                    isSelected={selectedMarket.id === market.id}
                    onSelect={() => setSelectedMarket(market)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Chart panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <PriceChart market={selectedMarket} />
            </motion.div>

            {/* Order Book */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-64"
            >
              <OrderBook currentPrice={selectedMarket.currentPrice} />
            </motion.div>
          </div>

          {/* Bottom row - Trade History, News, Terminal */}
          <div className="flex gap-2 h-[45%]">
            {/* Trade History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-80"
            >
              <TradeHistory marketId={selectedMarket.id} currentPrice={selectedMarket.currentPrice} />
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1"
            >
              <TerminalPanel />
            </motion.div>

            {/* News Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-72"
            >
              <NewsFeed />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-spinoza-yellow/20 to-transparent animate-scanline" />
      </div>

      {/* Corner decorations */}
      <div className="fixed top-12 left-48 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-spinoza-yellow/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-8 bg-gradient-to-b from-spinoza-yellow/50 to-transparent" />
      </div>
      <div className="fixed bottom-2 right-2 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-8 h-px bg-gradient-to-l from-spinoza-yellow/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-8 bg-gradient-to-t from-spinoza-yellow/50 to-transparent" />
      </div>
    </div>
  );
}

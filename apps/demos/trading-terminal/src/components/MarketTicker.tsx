'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { predictionMarkets } from '@/lib/data';

export function MarketTicker() {
  // Duplicate markets for infinite scroll effect
  const markets = [...predictionMarkets, ...predictionMarkets];

  return (
    <div className="h-8 bg-void border-b border-white/5 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-void to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-void to-transparent z-10" />

      {/* Ticker content */}
      <motion.div
        className="flex items-center h-full whitespace-nowrap animate-ticker"
        style={{ width: 'fit-content' }}
      >
        {markets.map((market, index) => {
          const change = market.currentPrice - market.previousPrice;
          const changePercent = ((change / market.previousPrice) * 100).toFixed(2);
          const isPositive = change >= 0;

          return (
            <div
              key={`${market.id}-${index}`}
              className="flex items-center gap-3 px-4 border-r border-white/5"
            >
              <span className="text-[10px] text-neutral-500 font-medium">{market.symbol}</span>
              <span className="text-[11px] text-white tabular-nums">{market.currentPrice.toFixed(1)}%</span>
              <span className={`flex items-center gap-0.5 text-[10px] tabular-nums ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? '+' : ''}{changePercent}%
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

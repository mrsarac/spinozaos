'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { generateRecentTrades, type Trade } from '@/lib/data';

interface TradeHistoryProps {
  marketId: string;
  currentPrice: number;
}

export function TradeHistory({ marketId, currentPrice }: TradeHistoryProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [newTradeId, setNewTradeId] = useState<string | null>(null);

  useEffect(() => {
    setTrades(generateRecentTrades(marketId, currentPrice));

    // Simulate new trades coming in
    const interval = setInterval(() => {
      const newTrade: Trade = {
        id: `trade-${Date.now()}`,
        marketId,
        price: Math.round((currentPrice + (Math.random() - 0.5) * 0.5) * 100) / 100,
        size: Math.floor(Math.random() * 10000) + 500,
        side: Math.random() > 0.5 ? 'buy' : 'sell',
        timestamp: new Date(),
      };

      setNewTradeId(newTrade.id);
      setTrades((prev) => [newTrade, ...prev.slice(0, 19)]);

      setTimeout(() => setNewTradeId(null), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [marketId, currentPrice]);

  return (
    <div className="h-full flex flex-col bg-void-light/50 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Recent Trades</span>
        </div>
        <span className="text-[9px] text-neutral-500 uppercase">Real-time</span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-2 px-3 py-2 text-[9px] text-neutral-500 uppercase tracking-wider border-b border-white/5">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Value</span>
        <span className="text-right">Time</span>
      </div>

      {/* Trades list */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          {trades.map((trade, index) => (
            <TradeRow
              key={trade.id}
              trade={trade}
              isNew={trade.id === newTradeId}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TradeRow({
  trade,
  isNew,
  index,
}: {
  trade: Trade;
  isNew: boolean;
  index: number;
}) {
  const isBuy = trade.side === 'buy';
  const value = trade.price * trade.size;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, backgroundColor: isBuy ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isNew
          ? isBuy ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
          : 'transparent'
      }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-4 gap-2 px-3 py-1.5 text-[11px] tabular-nums hover:bg-white/5 transition-colors border-b border-white/[0.02]"
    >
      <div className={`flex items-center gap-1 ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
        {isBuy ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trade.price.toFixed(2)}%
      </div>
      <span className="text-right text-neutral-300">{trade.size.toLocaleString()}</span>
      <span className="text-right text-neutral-500">${(value / 1000).toFixed(1)}K</span>
      <span className="text-right text-neutral-600">
        {trade.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    </motion.div>
  );
}

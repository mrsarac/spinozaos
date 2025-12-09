'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { generateOrderBook, type OrderBookEntry } from '@/lib/data';

interface OrderBookProps {
  currentPrice: number;
}

export function OrderBook({ currentPrice }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[]; asks: OrderBookEntry[] }>({
    bids: [],
    asks: [],
  });
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Initial load
    setOrderBook(generateOrderBook(currentPrice));

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(currentPrice + (Math.random() - 0.5) * 0.5));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const maxTotal = Math.max(
    ...orderBook.bids.map((b) => b.total),
    ...orderBook.asks.map((a) => a.total)
  );

  return (
    <div className="h-full flex flex-col bg-void-light/50 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Order Book</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3 h-3 text-neutral-500 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-[9px] text-neutral-500">
            {lastUpdate.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 gap-2 px-3 py-2 text-[9px] text-neutral-500 uppercase tracking-wider border-b border-white/5">
        <span>Price (%)</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>

      {/* Asks (sells) - reversed to show highest at top */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col-reverse">
          {orderBook.asks.slice(0, 8).map((order, index) => (
            <OrderRow
              key={`ask-${index}`}
              order={order}
              maxTotal={maxTotal}
              type="ask"
              index={index}
            />
          ))}
        </div>

        {/* Spread indicator */}
        <div className="flex items-center justify-center py-2 border-y border-white/5 bg-void/50">
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-neutral-500">Spread</span>
            <span className="text-spinoza-yellow font-medium tabular-nums">
              {orderBook.asks[0] && orderBook.bids[0]
                ? (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(2)
                : '0.00'}
              %
            </span>
            <span className="text-neutral-500">
              ({orderBook.asks[0] && orderBook.bids[0]
                ? (((orderBook.asks[0].price - orderBook.bids[0].price) / currentPrice) * 100).toFixed(3)
                : '0.000'}%)
            </span>
          </div>
        </div>

        {/* Bids (buys) */}
        <div>
          {orderBook.bids.slice(0, 8).map((order, index) => (
            <OrderRow
              key={`bid-${index}`}
              order={order}
              maxTotal={maxTotal}
              type="bid"
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderRow({
  order,
  maxTotal,
  type,
  index,
}: {
  order: OrderBookEntry;
  maxTotal: number;
  type: 'bid' | 'ask';
  index: number;
}) {
  const percentage = (order.total / maxTotal) * 100;
  const isBid = type === 'bid';

  return (
    <motion.div
      initial={{ opacity: 0, x: isBid ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-[11px] tabular-nums hover:bg-white/5 transition-colors"
    >
      {/* Background bar */}
      <div
        className={`absolute inset-y-0 ${isBid ? 'left-0' : 'right-0'} ${isBid ? 'bg-green-500/10' : 'bg-red-500/10'}`}
        style={{ width: `${percentage}%` }}
      />

      {/* Content */}
      <span className={`relative ${isBid ? 'text-green-400' : 'text-red-400'}`}>
        {order.price.toFixed(2)}
      </span>
      <span className="relative text-right text-neutral-300">
        {order.size.toLocaleString()}
      </span>
      <span className="relative text-right text-neutral-500">
        {order.total.toLocaleString()}
      </span>
    </motion.div>
  );
}

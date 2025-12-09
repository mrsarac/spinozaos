'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Clock, Users } from 'lucide-react';
import type { PredictionMarket } from '@/lib/data';

interface MarketCardProps {
  market: PredictionMarket;
  index: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function MarketCard({ market, index, isSelected, onSelect }: MarketCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const change = market.currentPrice - market.previousPrice;
  const changePercent = ((change / market.previousPrice) * 100).toFixed(2);
  const isPositive = change >= 0;

  const categoryColors: Record<string, string> = {
    agi: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    asi: 'bg-red-500/20 text-red-400 border-red-500/30',
    capability: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    safety: 'bg-green-500/20 text-green-400 border-green-500/30',
    timeline: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onSelect}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-300
        bg-void-light/80 border
        ${isSelected
          ? 'border-spinoza-yellow/50 shadow-lg shadow-spinoza-yellow/10'
          : 'border-white/5 hover:border-white/10'
        }
      `}
    >
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            className="absolute left-0 top-2 bottom-2 w-0.5 bg-spinoza-yellow origin-center"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-spinoza-yellow">{market.symbol}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded border ${categoryColors[market.category]}`}>
              {market.category.toUpperCase()}
            </span>
          </div>
          <h3 className="text-sm font-medium text-white leading-tight">{market.name}</h3>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-green-400 animate-pulse" />
          <span className="text-[9px] text-green-400">LIVE</span>
        </div>
      </div>

      {/* Price display */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {market.currentPrice.toFixed(1)}
            <span className="text-sm text-neutral-500">%</span>
          </div>
          <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="tabular-nums">{isPositive ? '+' : ''}{changePercent}%</span>
            <span className="text-neutral-500">24h</span>
          </div>
        </div>

        {/* Mini chart placeholder */}
        <div className="w-20 h-10 flex items-end gap-px">
          {market.priceHistory.slice(-20).map((point, i) => {
            const height = (point.price / 100) * 100;
            return (
              <div
                key={i}
                className={`flex-1 rounded-sm ${isPositive ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                style={{ height: `${Math.max(10, height)}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-[10px] text-neutral-500">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span className="tabular-nums">${(market.volume24h / 1000000).toFixed(2)}M</span>
          <span>Vol</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{new Date(market.resolveDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.03) 0%, transparent 50%, rgba(139,92,246,0.03) 100%)',
        }}
      />
    </motion.div>
  );
}

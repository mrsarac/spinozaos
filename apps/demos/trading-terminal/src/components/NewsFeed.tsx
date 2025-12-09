'use client';

import { motion } from 'framer-motion';
import { Newspaper, AlertTriangle, TrendingUp, ExternalLink } from 'lucide-react';
import { newsFeed } from '@/lib/data';

export function NewsFeed() {
  return (
    <div className="h-full flex flex-col bg-void-light/50 rounded-lg border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-spinoza-yellow" />
          <span className="text-sm font-medium text-white">Market News</span>
        </div>
        <span className="flex items-center gap-1 text-[9px] text-green-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          LIVE
        </span>
      </div>

      {/* News items */}
      <div className="flex-1 overflow-auto">
        {newsFeed.map((news, index) => (
          <NewsItem key={news.id} news={news} index={index} />
        ))}
      </div>
    </div>
  );
}

function NewsItem({
  news,
  index,
}: {
  news: typeof newsFeed[0];
  index: number;
}) {
  const impactColors: Record<string, string> = {
    high: 'text-red-400 bg-red-500/10 border-red-500/30',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    low: 'text-green-400 bg-green-500/10 border-green-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] text-neutral-500">{news.time}</span>
        <span className={`text-[8px] px-1.5 py-0.5 rounded border uppercase ${impactColors[news.impact]}`}>
          {news.impact}
        </span>
      </div>

      <p className="text-xs text-white leading-relaxed mb-2 group-hover:text-spinoza-yellow transition-colors">
        {news.title}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {news.symbols.map((symbol) => (
            <span
              key={symbol}
              className="text-[9px] px-1.5 py-0.5 rounded bg-spinoza-yellow/10 text-spinoza-yellow border border-spinoza-yellow/30"
            >
              {symbol}
            </span>
          ))}
        </div>
        <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
      </div>
    </motion.div>
  );
}

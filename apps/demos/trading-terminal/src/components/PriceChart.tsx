'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ZoomIn, ZoomOut, Maximize2, TrendingUp, TrendingDown } from 'lucide-react';
import type { PredictionMarket } from '@/lib/data';

interface PriceChartProps {
  market: PredictionMarket;
}

const timeframes = ['1H', '4H', '1D', '1W', '1M', 'ALL'];

export function PriceChart({ market }: PriceChartProps) {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');

  const change = market.currentPrice - market.previousPrice;
  const isPositive = change >= 0;

  // Format data for chart
  const chartData = market.priceHistory.map((point) => ({
    time: new Date(point.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    price: point.price,
    volume: point.volume,
  }));

  const minPrice = Math.min(...chartData.map((d) => d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.price));
  const avgPrice = chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length;

  return (
    <div className="h-full flex flex-col bg-void-light/50 rounded-lg border border-white/5 overflow-hidden">
      {/* Chart header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-spinoza-yellow">{market.symbol}</span>
              <span className="text-sm text-neutral-400">/ PROB</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold text-white tabular-nums">
                {market.currentPrice.toFixed(2)}%
              </span>
              <span className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}{change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 p-1 bg-void rounded-lg">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`
                px-2 py-1 text-[10px] font-medium rounded transition-colors
                ${activeTimeframe === tf
                  ? 'bg-spinoza-yellow/20 text-spinoza-yellow'
                  : 'text-neutral-500 hover:text-white'
                }
              `}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart controls */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? '#22c55e' : '#ef4444'}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? '#22c55e' : '#ef4444'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#525252', fontSize: 9 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minPrice - 2, maxPrice + 2]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#525252', fontSize: 9 }}
              tickFormatter={(value) => `${value}%`}
              orientation="right"
              width={40}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '11px',
              }}
              labelStyle={{ color: '#a3a3a3' }}
              itemStyle={{ color: '#fbbf24' }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Price']}
            />

            <ReferenceLine
              y={avgPrice}
              stroke="#fbbf24"
              strokeDasharray="3 3"
              strokeOpacity={0.3}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#22c55e' : '#ef4444'}
              strokeWidth={2}
              fill="url(#priceGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart stats */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-white/5 text-[10px]">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-neutral-500">High</span>
            <span className="ml-1 text-green-400 tabular-nums">{maxPrice.toFixed(2)}%</span>
          </div>
          <div>
            <span className="text-neutral-500">Low</span>
            <span className="ml-1 text-red-400 tabular-nums">{minPrice.toFixed(2)}%</span>
          </div>
          <div>
            <span className="text-neutral-500">Avg</span>
            <span className="ml-1 text-spinoza-yellow tabular-nums">{avgPrice.toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-neutral-500">Vol</span>
          <span className="text-cyan-400 tabular-nums">${(market.volume24h / 1000000).toFixed(2)}M</span>
        </div>
      </div>
    </div>
  );
}

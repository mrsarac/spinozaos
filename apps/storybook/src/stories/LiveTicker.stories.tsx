import type { Meta, StoryObj } from '@storybook/react';
import { LiveTicker, type TickerItem } from '@spinozaos/react';

const marketData: TickerItem[] = [
  { id: '1', label: 'AGI-2026', value: 0.34, prefix: '$', change: 12.5, trend: 'up' },
  { id: '2', label: 'AGI-2027', value: 0.52, prefix: '$', change: 8.2, trend: 'up' },
  { id: '3', label: 'GPT-5', value: 0.78, prefix: '$', change: -3.4, trend: 'down' },
  { id: '4', label: 'ROBOT-2025', value: 0.23, prefix: '$', change: 5.7, trend: 'up' },
  { id: '5', label: 'AUTO-L5', value: 0.45, prefix: '$', change: -1.2, trend: 'down' },
  { id: '6', label: 'NEURA-2025', value: 0.67, prefix: '$', change: 15.8, trend: 'up' },
  { id: '7', label: 'QUANT-2026', value: 0.12, prefix: '$', change: -8.9, trend: 'down' },
  { id: '8', label: 'MARS-2030', value: 0.89, prefix: '$', change: 2.1, trend: 'up' },
];

const cryptoData: TickerItem[] = [
  { id: '1', label: 'BTC/USD', value: '67,543.21', prefix: '$', change: 2.45, trend: 'up' },
  { id: '2', label: 'ETH/USD', value: '3,421.87', prefix: '$', change: -1.23, trend: 'down' },
  { id: '3', label: 'SOL/USD', value: '178.45', prefix: '$', change: 8.76, trend: 'up' },
  { id: '4', label: 'AVAX/USD', value: '42.18', prefix: '$', change: 3.21, trend: 'up' },
  { id: '5', label: 'DOT/USD', value: '8.92', prefix: '$', change: -2.54, trend: 'down' },
];

const systemMetrics: TickerItem[] = [
  { id: '1', label: 'CPU', value: 45, suffix: '%', trend: 'neutral' },
  { id: '2', label: 'Memory', value: 67, suffix: '%', trend: 'up' },
  { id: '3', label: 'Network', value: '1.2', suffix: 'Gbps', trend: 'up' },
  { id: '4', label: 'Latency', value: 12, suffix: 'ms', trend: 'down' },
  { id: '5', label: 'Uptime', value: '99.9', suffix: '%', trend: 'up' },
];

const meta: Meta<typeof LiveTicker> = {
  title: 'Components/LiveTicker',
  component: LiveTicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal scrolling real-time data ticker with trend indicators. Part of Substance design language.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LiveTicker>;

// Default
export const Default: Story = {
  args: {
    items: marketData,
    showTrend: true,
  },
};

// Slow Speed
export const SlowSpeed: Story = {
  args: {
    items: marketData,
    speed: 'slow',
    showTrend: true,
  },
};

// Fast Speed
export const FastSpeed: Story = {
  args: {
    items: marketData,
    speed: 'fast',
    showTrend: true,
  },
};

// Pause on Hover
export const PauseOnHover: Story = {
  args: {
    items: marketData,
    pauseOnHover: true,
    showTrend: true,
  },
};

// Without Trend
export const NoTrend: Story = {
  args: {
    items: marketData,
    showTrend: false,
  },
};

// Custom Separator
export const CustomSeparator: Story = {
  args: {
    items: marketData,
    showTrend: true,
    separator: <span className="text-spinoza-yellow/50">|</span>,
  },
};

// Crypto Markets
export const CryptoMarkets: Story = {
  args: {
    items: cryptoData,
    speed: 'normal',
    showTrend: true,
    pauseOnHover: true,
  },
};

// System Metrics
export const SystemMetrics: Story = {
  args: {
    items: systemMetrics,
    speed: 'slow',
    showTrend: true,
  },
};

// In Header Context
export const HeaderContext: Story = {
  render: () => (
    <div className="bg-void">
      <header className="border-b border-white/5 bg-void-light">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-spinoza-yellow/20 flex items-center justify-center">
              <span className="text-spinoza-yellow font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold">Substance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-neutral-500">Live</span>
          </div>
        </div>
      </header>
      <LiveTicker items={marketData} showTrend pauseOnHover />
    </div>
  ),
};

// Dashboard Footer
export const DashboardFooter: Story = {
  render: () => (
    <div className="bg-void min-h-[300px] flex flex-col">
      <div className="flex-1 p-6">
        <h2 className="text-white text-lg font-semibold">Dashboard Content</h2>
        <p className="text-neutral-500 text-sm mt-2">Main dashboard area...</p>
      </div>
      <div className="mt-auto">
        <LiveTicker items={systemMetrics} speed="slow" showTrend />
      </div>
    </div>
  ),
};

// Multiple Tickers
export const MultipleTickers: Story = {
  render: () => (
    <div className="bg-void space-y-0.5">
      <div className="text-[10px] text-neutral-600 uppercase tracking-wider px-4 py-1 bg-void-lighter">
        AGI Markets
      </div>
      <LiveTicker items={marketData} showTrend speed="normal" />
      <div className="text-[10px] text-neutral-600 uppercase tracking-wider px-4 py-1 bg-void-lighter">
        Crypto
      </div>
      <LiveTicker items={cryptoData} showTrend speed="fast" />
      <div className="text-[10px] text-neutral-600 uppercase tracking-wider px-4 py-1 bg-void-lighter">
        System
      </div>
      <LiveTicker items={systemMetrics} showTrend speed="slow" />
    </div>
  ),
};
